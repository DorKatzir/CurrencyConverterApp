new Vue({

    el: '#app',

    data: {

        currencies: {},
        amount: null,
        from: 'EUR',
        to: 'USD',
        result: 0,

        loading: false
    },

    mounted() {

        this.getCurrencies();
    },

    computed: {

        formattedCurrencies() {
            // console.log(Object.values(this.currencies))

            return Object.values(this.currencies)
        },

        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        },

        disabled() {
            return this.amount === 0 || !this.amount || this.loading;
        }

    },

    methods: {

        getCurrencies() {

            const currencies = localStorage.getItem('currencies')

            if (currencies) {
                this.currencies = JSON.parse(currencies)
                return;
            }

            axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=e84da0c6f96aa8a0f1bf')
                .then(response => {
                    this.currencies = response.data.results;

                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                })
        },

        convertCurrency() {

            const key = `${this.from}_${this.to}`;

            this.loading = true;

            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?apiKey=e84da0c6f96aa8a0f1bf&q=${key}`)
                .then(response => {
                    this.loading = false;
                    this.result = response.data.results[key].val

                })
        }


    },

    watch: {

        amount() {
            this.result = 0;

        }

    }



})



////////////