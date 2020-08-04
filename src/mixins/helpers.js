export const globalHelpers = {

    methods: {
        displayAPIValidationErrors(errors, key) {
            if (errors === undefined || errors.length == 0) {
                return "";
            }

            var errorMsg = null;
            
            errors.forEach((obj) => {
               if(obj.key == key){
                errorMsg = obj.message;
               }
            });
            return errorMsg;
        }
    }

}