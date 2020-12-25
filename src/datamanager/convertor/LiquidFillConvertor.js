const convertor = function(data,conf){

	if(data.length==0){
		return {
			name:'',
			value:0
		}
	}

	var firstData = data[0];

	return {
		name:firstData[conf.name],
		value:firstData[conf.value]
	};
}

export default convertor;