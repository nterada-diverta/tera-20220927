<template>
    <div>
        <div v-if="signupDone">
            Thank you for signing up.
        </div>
        <p v-if="error" :style="{ color: 'red' }">
            {{ error }}
        </p>
    </div>
</template>

<script>
export default {
    validate({ params }) {
        return /[!-~]{32}/.test(params.key)
    },
    data() {
        return {
            signupDone: false,
            error: null
        }
    },
    methods: {
        async registerUser() {
            // obtain POSTed form values
            const invitationRes = await this.$axios.post(
                '/rcms-api/10/member/invite',
                {
                    email_hash: this.$route.params.key
                }
            );
            try {
                const payload = {
                    email: invitationRes.data.data.email,
                    ...invitationRes.data.data.ext_info
                }
                // request registration to an API endpoint using custom function
                await this.$axios.post('/rcms-api/10/member/regist', payload);
                this.signupDone = false
            } catch (error) {
                this.error = error.response.data.errors[0].message
            }
        }
    },
    mounted($route) {
        this.registerUser();
    }
}
</script>
