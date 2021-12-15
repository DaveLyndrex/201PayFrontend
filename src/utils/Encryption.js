export default {
    methods: {
        encrypt: async function(data) {
            let encryption = await this.$store.dispatch("encryptData", {
              data: data,
            });
            switch (encryption.status) {
              case 200:
                return encryption;
      
              case 500:
                this.showErrorResponse("Oops!", encryption.data.Message);
                return null;
      
              default:
                return null;
            }
          },
    }
}