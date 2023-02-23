<template>
    <form @submit.prevent="login">
        <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
            {{ resultMessage }}
        </p>

        <input v-model="email" name="email" type="email" placeholder="email"/>
        <input
            v-model="password"
            name="password"
            type="password"
            placeholder="password"
        />
        <button type="submit">
            Login
        </button>
        <div>
            <nuxt-link to="/news">
                News list page
            </nuxt-link>
            <br/>
            <nuxt-link to="/news/test_with_comment">
                Test with comment
            </nuxt-link>
        </div>
    </form>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',

            loginStatus: null,
            resultMessage: null
        };
    },
    computed: {
        resultMessageColor () {
            switch (this.loginStatus) {
            case 'success':
                return 'green'
            case 'failure':
                return 'red'
            default:
                return ''
            };
        }
    },
    methods: {
        async login () {

            try {
                const payload = {
                    email: this.email,
                    password: this.password
                }
                await this.$store.dispatch('login', payload)
                this.loginStatus = 'success'
                this.resultMessage = 'Login successful'
            } catch (e) {
                this.loginStatus = 'failure'
                this.resultMessage = 'Login failed'
            };
        }
    },
};
</script>