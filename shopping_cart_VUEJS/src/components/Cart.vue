<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p class="empty" v-show="!products.length">
      <i>Your cart is empty!</i>
      <router-link to="/allgoods">Go shopping</router-link>
      <router-link to="/">Home</router-link>
    </p>
      <section class="product-container">
    <div class="cart-container" v-show="products.length">
      <div class="hide">
        <div class="main-cart-container" v-for="product in products" :key="product.id">
        <div class="cart-img">
          <img
            :src="product.image"
            alt="Product Image"
            height="100"
            width="100"
          />
          <p class="name">{{ product.name }}</p>
        </div>
        <hr>
        <div class="price">
          <p>{{ product.price }} $</p>
        </div>
        <hr>
        <div class="action-container">
          <button @click="increaseItem(product)" class="more-action">+1</button>
          <span>{{ product.quantity }}</span>
          <button @click="reduceItem(product)" class="less-action">-1</button>
          <br>
          <button @click="removeFromCart(product)" class="remove">Remove</button>
        </div>
      </div>
      <div class="total-price">
        <span>Total price: {{ total }} $</span>
      </div>
      </div>
          <button class="btn-submit" @click="checkout">Submit</button>
    </div>
      </section>
    </div>
</template>
<script>
import { mapGetters, mapActions} from "vuex";
export default {
  name:'Cart',
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  },
  methods: {
    ...mapActions({
      increaseItem: "increaseItem",
      reduceItem: "reduceItem",
      removeFromCart: "removeFromCart"
    }),

    checkout() {
      alert("Thank you for your order. You have purchased goods on " + this.total +" $. "+
        "Our manager will contact you shortly");
    }
  }
};
</script>
