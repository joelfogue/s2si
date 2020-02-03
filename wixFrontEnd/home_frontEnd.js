import { getAllBusinesses } from 'backend/fetchAPG'

$w.onReady(function () {
	//TODO: write your page related code here...

});

export function onClickSearchBiz(event) {
	getAllBusinesses().then(allBusinesses => {
		var allBiz = allBusinesses.message.Items;
		console.log("PRINTING THE OUTPUT FROM THE APG CALL...")
		console.log(allBiz);
		var i = 0;
		var aBusiness = "";
		var singleBiz = "";
		for (i = 0; i < allBiz.length; i++) {
			singleBiz = allBiz[i];
			aBusiness += JSON.stringify(singleBiz.BusinessName.S) +
				"\n" + JSON.stringify(singleBiz.PhoneNumber.S) + "\n" +
				JSON.stringify(singleBiz.Address.S) + "\n" +
				JSON.stringify(singleBiz.BusinessImageIcon.S) +
				"\n" + JSON.stringify(singleBiz.BusinessId.S) +
				"\n----------------------------\n";
		}
		$w("#allBizDisplay").text = aBusiness;
	});

}