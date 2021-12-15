export default {
    methods: {
        create: async function(data, storeAction) {
            data.EmpID = JSON.parse(sessionStorage.getItem("user_session")).empId;
            data.ModifiedBy = JSON.parse(
                localStorage.getItem("user_details")
            ).data.Email;
            try {
                let encryptedData = await this.encrypt(data);

                if (encryptedData) {
                    let addNew = await this.$store.dispatch(
                        storeAction,
                        encryptedData.data
                    );
                    // console.log(addNew)
                    let resData =
                        typeof addNew.data === "object" ?
                        addNew.data :
                        JSON.parse(addNew.data);

                    switch (addNew.status) {
                        case 200:
                            {
                                let returnRes = true;
                                if (resData.code === "200") {
                                    // if (this.$route.fullPath.split('/')[2] != 'kiosk') {
                                    //     this.showSuccessResponse("Success", resData.message);
                                    // }
                                    returnRes = true;
                                }
                                if (resData.code === "404" || resData.error) {
                                    this.showErrorResponse(resData.message);
                                    returnRes = false;
                                }
                                return returnRes;
                            }

                        case 500:
                            // this.showErrorResponse(addNew);
                            console.log(addNew);
                            return false;

                        default:
                            return false;
                    }
                }
            } catch (error) {
                this.showErrorResponse("Something went wrong!");
                return false;
            }
        },

        retrieve: async function(storeAction, storeMutation, storeGetters) {
            console.log(storeGetters, storeMutation, storeGetters)
            try {

                let getData = await this.$store.dispatch(storeAction);
                console.log(getData, "Wowowowow");
                const ciphertext = getData.data.ciphertext;
                // let resData =
                //         typeof getData.data === "object" ?
                //         getData.data :
                //         JSON.parse(getData.data);
                switch (getData.status) {
                    case 200:
                        {
                            let decrypted = await this.decrypt(ciphertext, storeMutation);
                            // console.log(decrypted.data)
                            if (
                                JSON.parse(decrypted.data).code === "404" ||
                                JSON.parse(decrypted.data).error === true
                            ) {
                                this.showErrorResponse(JSON.parse(decrypted.data).message);
                                return null;
                            }
                            return this.$store.getters[storeGetters];
                        }

                    case 500:
                        {
                            this.showErrorResponse(getData.message);
                            return null;
                        }

                    default:
                        return null;
                }
            } catch (error) {
                this.showErrorResponse(error);
                // this.showErrorResponse(error);
                return null;
            }
        },

        update: async function(data, editedIndex, storeAction, storeGetters) {
            data.EmpID = JSON.parse(sessionStorage.getItem("user_session")).empId;
            data.ModifiedBy = JSON.parse(
                localStorage.getItem("user_details")
            ).data.Email;
            try {
                let encryptedData = await this.encrypt(data);

                if (encryptedData) {
                    let updateData = await this.$store.dispatch(storeAction, {
                        index: editedIndex,
                        ciphertext: encryptedData.data,
                        editedData: data,
                    });

                    let resData =
                        typeof updateData.data === "object" ?
                        updateData.data :
                        JSON.parse(updateData.data);

                    switch (updateData.status) {
                        case 200:
                            {
                                let returnData = null;
                                if (resData.code === "404" || resData.error) {
                                    this.showErrorResponse("Something went wrong!");
                                    returnData = null;
                                }
                                if (resData.code === "200") {
                                    // this.showSuccessResponse("Success!", resData.message);
                                    returnData = this.$store.getters[storeGetters];
                                }
                                return returnData;
                            }

                        case 500:
                            this.showErrorResponse("Something went wrong!");
                            return null;

                        default:
                            return null;
                    }
                }
                return this.$store.getters[storeGetters];
            } catch (error) {
                this.showErrorResponse(error);
                // this.showErrorResponse(error);
                return null;
            }
        },

        delete: async function(data, storeAction) {
            console.log(data, storeAction);
            try {
                let delData = await this.$store.dispatch(storeAction, {
                    item: data.itemToDelete,
                    id: data.itemToDelete.ID,
                });
                let resData =
                    typeof delData.data === "object" ? delData : JSON.parse(delData.data);
                switch (delData.status) {
                    case 200:
                        {
                            if (resData.code === "404" || resData.error) {
                                this.showErrorResponse(resData.message);
                                return false;
                            } else {
                                return true;
                            }
                        }

                    case 404:
                        this.showErrorResponse("Something went wrong");
                        return false;

                    case 500:
                        this.showErrorResponse("Something went wrong");
                        return false;

                    default:
                        return false;
                }
            } catch (error) {
                this.showErrorResponse("Something went wrong!");
                return false;
            }
        },
    },
};