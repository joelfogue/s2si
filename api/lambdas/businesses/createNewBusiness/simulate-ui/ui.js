const axios = require('axios');


async function createNewBusiness() {
    // categoryOptions = {
    //     categoryId: categoryId;
    // };
    const headerOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    let catId="fd844b9e-75b7-4bb0-91ed-baedbe106ff8";
    let catUrl = "https://tujhponwl9.execute-api.us-east-1.amazonaws.com/develop/Category/"+catId;

    axios.get(catUrl, headerOptions).then((res) => {
            console.log("---------------------------------------------");
            console.log("RESPONSE:", res.data);
            console.log("---------------------------------------------");
            //extract the category name so we can issue a post to create this new business
            var catName = res.data.categoryName;
            var catId=res.data.categoryId;

            console.log(catId);
            console.log(catName);
            let bizUrl ="https://tujhponwl9.execute-api.us-east-1.amazonaws.com/develop/Business";
            let businessObj={
                BusinessName: "TradeAll",
                Category: {
                    CategoryId: catId,
                    CategoryName: catName
                },
                BusinessImageIcon: "some other icon",
                Address: "123 Main Street, Amherst, MA 01027",
                BusinessHours: "Mon(9am - 5pm) - Tues (9am - 5pm) - Wed (9am - 5pm)",
                PhoneNumber: "413-000-0000",
                BusinessId: "some biz id"
            }
            axios.post(bizUrl, businessObj, headerOptions).then((res) => {
                    console.log("---------------------------------------------");
                    console.log("RESPONSE:", res.data);
                    console.log("---------------------------------------------");
                })
                .catch((err) => {
                    console.log("---------------------------------------------");
                    console.log("ERROR:"+ err);
                    console.log("---------------------------------------------");
                })
        })
        .catch((err) => {
            console.log("---------------------------------------------");
            console.log("ERROR: "+err);
            console.log("---------------------------------------------");
        })
}

//calling our function to execute here
createNewBusiness();

//exporting our function to be used in other external files
module.exports = {
    createNewBusiness: createNewBusiness
};