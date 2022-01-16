<template>
  <div>
    <div>
      <Button
        v-if="!user.address"
        type="primary"
        @click="clickLogin"
      >Login</Button>
      <Card v-else>
        <p>地址:{{user.address}}</p>
        <p>余额:{{user.balance}}</p>
      </Card>
    </div>
    <div>
    </div>
    <Row
      style="margin: 10px"
      type="flex"
      justify="center"
    >
      <Col
        v-for="(item,idx) in list"
        :key="idx"
        span="5"
      >
      <Card class="item">
        <p slot="title">{{item.nft_id}}</p>
        <p>seller_id: {{item.seller_id}}</p>
        <p>token_id: {{item.token_id}}</p>
        <p>price: {{item.order_info.price || '暂未发售'}}</p>
        <Button @click="clickApprove(item)">Approve</Button>
        <Button @click="clickListing(item)">Listing</Button>
        <Button @click="clickBuy(item)">Buy</Button>
        <Button @click="clickCancel(item)">Cancel</Button>
      </Card>
      </Col>
    </Row>

    <div style="margin-top: 10px;">
      <Button @click="clickMint">mintTest</Button>
      <Button @click="clickGetOwn">getOwn</Button>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
  data() {
    return {
      list: [],
      user: {},
      web3: {},
      contract: {}
    }
  },
  methods: {
    async clickLogin() {
      const t = await this.$eth.getSigner()
      const address = await t.getAddress()
      const balanceWei = await t.getBalance()
      const network = await t.provider.getNetwork()
      const balance = await this.$eth.formatEth(balanceWei)
      this.user = { address, balance, network }
    },

    async clickMint() {
      // const res = await this.$apis.postNftMint(this.user.address)
      // console.log(res)
    },
    async clickApprove(item) {
      // const t = await this.$eth.approve(item, this.contract.contract_info.contract_address)
      // console.log('approve finished...')
    },
    async clickBuy(item) {
      const decimals = this.$ls.get('decimals')
      const { order_id } = item.order_info
      const orderInfo = await this.$apis.getNftBuyByID(order_id)
      this.$eth.buyNFT(this.contract.contract_info, orderInfo, decimals[item.order_info.currency])
    },
    async clickGetOwn() {
      const contract = await this.$apis.getContractInfo()
      const owner = await this.$eth.getOwner(contract[0])
      console.log('owner', owner)
    },
    async clickCancel(item) {
      const { order_id } = item.order_info
      const orderInfo = await this.$apis.getNftBuyByID(order_id)
      await this.$eth.cancelOrder(this.contract.contract_info, orderInfo, this.$ls.get('decimals')[item.order_info.currency])
      await this.$apis.postCancelOrderByID(order_id)
    }
  },
  watch: {
    'web3.currentProvider.selectedAddress'(v) {
      if (v) this.clickLogin()
    }
  },
  async mounted() {
    this.web3 = window.web3
  }
}

</script>

<style>
.item {
  margin-right: 10px;
}
</style>