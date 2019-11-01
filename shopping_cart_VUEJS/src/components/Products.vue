<template>
  <div>
    <h2>Our goods</h2>
    <router-link class="to-the-cart" to="/cart">Go to the cart</router-link>
    <section class="goods-container">
        <div
          v-for="product in products"
          track-by="id"
          :key="product.id"
          class="single-goods"
        >
          <div>
              <img :src="product.image"/>
            <div class="product-description">
              <div class="product-name">{{product.name}}</div>
              <div class="product-price">{{ product.price }} $</div>
            </div>
              <button
                v-if="!productInCart(product.id)"
                @click="addToCart(product)"
              >Add to cart</button>
              <div v-else class="else">
                <button @click="increaseItem(product)" class="more-add">+1</button>
                <button @click="reduceItem(product)" class="less-add">-1</button>
              </div>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Products",
  components: {},

  computed: mapGetters({
    products: "allProducts",
    length: "getNumberOfProducts",
    productInCart: "productInCart"
  }),
  methods: mapActions(["addToCart", "increaseItem", "reduceItem"])
};
</script>
<style lang="scss">
  html {
    font-size: 16px;
  }

  .header-text-shop {
    height: 43.75rem;
    h1 {
      text-align: center;
      text-transform: uppercase;
      font-size: 4.375rem;
      padding-top: 11.375rem;
      color: white;
      font-weight: bold;
    }
    p {
      text-align: center;
      margin-top: 8.875rem;
      color: white;
      font-size: 1.875rem;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  h2{
    text-align: center;
    margin: 10px;
    font-size: 3rem;
    text-transform: uppercase;
  }

  .to-the-cart{
    text-decoration: none;
    color: darkgreen;
    font-style: italic;
    margin: 10px;
    font-size: 1.2rem;
    :hover{
      color: darkred;
    }
  }
  .goods-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 10px;

    .single-goods {
      width: 22vw;
      height: 30rem;
      border: 3px solid darkgreen;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.438);
      box-shadow: 10px 13px 17px -2px black;
      margin: 10px;
      img {
        width: 100%;
        height: 35vh;
      }
      button {
        text-align: center;
        padding: 10px;
        font-size: 1.2rem;
        border-radius: 5px;
        background: darkgreen;
        border: 1px solid black;
        display: block;
        margin: 30px auto;
        text-transform: uppercase;
        color: white;
      }
    }
    .product-name {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.2rem;
      height: 80px;
      text-align: center;
    }
    .product-price {
      color: darkred;
      font-size: 1.4rem;
      font-weight: 700;
      margin-top: 10px;
      text-align: center;

    }
    .else {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .more-add {
      background: darkgreen;
      width: 60px;
      color: white;
    }
    .less-add {
      background: #ec0202;
      width: 60px;
      color: white;
    }

  }
</style>
