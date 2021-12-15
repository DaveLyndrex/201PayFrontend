export default {
  methods: {
    decrypt: async function(ciphertext, mutation) {
      let decryption = await this.$store.dispatch("decryptData", {
        mutation: mutation,
        data: ciphertext,
      });

      switch (decryption.status) {
        case 200:
          return decryption;

        case 500:
          this.showWarningResponse(
            "Oops!",
            "An error on the serve is encountered!"
          );
          return false;

        default:
          return false;
      }
    },
  },
};
