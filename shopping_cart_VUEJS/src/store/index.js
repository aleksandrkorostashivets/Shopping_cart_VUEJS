import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

export const addedLS = (state) => {
    localStorage.setItem('added', JSON.stringify(state.added))
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        added: JSON.parse(localStorage.getItem('added')) || [],
        all: [
            {
                id: '1',
                name: 'Honey-Glazed Pulled Chicken with Roasted Cauliflower',
                image: 'https://s3-us-west-2.amazonaws.com/mymetabolicmeals.com/wp-content/uploads/Large/opt/2019/wk+34/Honey-Roasted-Pulled-Chicken-with-Roasted-Cauliflower-Turkey-Bacon-and-Carmelized-Onion.jpg',
                description: 'Honey-Glazed Pulled Chicken with Roasted Cauliflower',
                price: 12
            },
            {
                id: '2',
                name: 'Organic Grilled Swiss Turkey Burger',
                image:
                    'https://www.mymetabolicmeals.com/wp-content/uploads/2019/06/Swiss-Cheese-Turkey-Burger-with-Roasted-Carrots-site.jpg',
                description: 'Organic Grilled Swiss Turkey Burger',
                price: 11
            },
            {
                id: '3',
                name: 'Blue Ribbon Chicken Cordon Bleu',
                image:
                    'https://images-gmi-pmc.edge-generalmills.com/26807741-9624-4591-b290-bf42ab99222d.jpg',
                description: 'Blue Ribbon Chicken Cordon Bleu',
                price: 18
            },
            {
                id: '4',
                name: 'BLT Scrambler',
                image:
                    'https://media-cdn.tripadvisor.com/media/photo-s/0d/8e/6e/0f/great-experience.jpg',
                description: 'BLT Scrambler',
                price: 10
            },
            {
                id: '5',
                name: 'Chocolate Chip Cookies',
                image:
                    'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg',
                description:
                    'Chocolate Chip Cookies',
                price: 9
            },
            {
                id: '6',
                name: 'Peanut Butter Banana Cake',
                image:
                    'https://holycowvegan.net/wp-content/uploads/2011/09/vegan-banana-cake-vegan-peanut-butter-frosting-4.jpg',
                description:
                    'Peanut Butter Banana Cake',
                price: 9
            },
            {
                id: '7',
                name: 'Grass-Fed Beef Burger with Cabernet Onions',
                image:
                    'https://www.mymetabolicmeals.com/wp-content/uploads/2019/02/Grass-Fed-Bison-Burger-with-Cabernet-Onions-Wisconsin-Cheddar-and-Green-Beans-small.jpg',
                description:
                    'Grass-Fed Beef Burger with Cabernet Onions',
                price: 16
            },
            {
                id: '8',
                name: 'Salmon Burger Patties',
                image:
                    'https://www.seriouseats.com/images/2017/04/20170406-salmon-burgers-vicky-wasik-17-1500x1125.jpg',
                description:
                    'Salmon Burger Patties',
                price: 18
            },
            {
                id: '9',
                name: 'BBQ Chicken Breast',
                image:
                    'https://ifoodreal.com/wp-content/uploads/2018/05/FG-grilled-chicken-breast.jpg',
                description:
                    'BBQ Chicken Breast',
                price: 12
            }
        ]
    },

    getters: {
        allProducts: state => state.all,

        getNumberOfProducts: state => (state.all ? state.all.length : 0),

        productInCart: state => id =>
            state.added.some(p => {
                if (p.quantity > 0) {
                    return p.id === id
                } else {
                    return false
                }
            }),

        cartProducts: state => {
            return state.added.map(({ id, quantity }) => {
                const product = state.all.find(p => p.id === id)
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity
                }
            })
        }
    },

    actions: {
        addToCart: function ({ commit, state }, product) {
            commit(types.ADD_ITEM, {
                id: product.id
            })
            console.log(state)
            //  addedLS(state)
            localStorage.setItem('added', JSON.stringify(state.added))
        },

        increaseItem: function ({ commit, state }, product) {
            commit(types.INCREASE_ITEM, {
                id: product.id
            })
            console.log(state)
            //  addedLS(state)
        },

        removeFromCart: function ({ commit, state }, product) {
            commit(types.REMOVE_ITEM, {
                id: product.id
            })
            //  addedLS(state)
            localStorage.setItem('added', JSON.stringify(state.added))
        },

        reduceItem: function ({ commit, state }, product) {
            commit(types.REDUCE_ITEM, {
                id: product.id
            })
            //  addedLS(state)
            localStorage.setItem('added', JSON.stringify(state.added))
        }
    },

    mutations: {
        [types.ADD_ITEM] (state, { id }) {
            state.added.push({
                id,
                quantity: 1
            })
            //  toast.success('Product added successfully.')
        },

        [types.INCREASE_ITEM] (state, { id }) {
            const record = state.added.find(p => p.id === id)
            record.quantity++
            //  toast.success('Product quantity increased successfully.')
        },

        [types.REMOVE_ITEM] (state, { id }) {
            state.added = state.added.filter(p => p.id !== id)
            //  toast.success('Product removed successfully.')
        },

        [types.REDUCE_ITEM] (state, { id }) {
            const record = state.added.find(p => p.id === id)
            record.quantity--
            if (record.quantity === 0) {
                state.added = state.added.filter(p => p.id !== id)
            }
            //  toast.success('Product quantity reduced successfully.')
        }
    }
})
