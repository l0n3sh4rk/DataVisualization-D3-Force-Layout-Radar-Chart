function row(d){
	return {
		year: +d.year,
		gender: d.gender,
		tid: d.tid,
		mid: d.mid,
		player1: d.player1,
		player2: d.player2,
		country1: d.country1,
		country2: d.country2,
		firstServe1: +d.firstServe1,
		firstServe2: +d.firstServe2,
		ace1: d.ace1,
		ace2: d.ace2,
		double1: d.double1,
		double2: d.double2,
		firstPointWon1: +(d.firstPointWon1.substring(0,d.firstPointWon1.length-1)),
		firstPointWon2: +(d.firstPointWon2.substring(0,d.firstPointWon2.length-1)),
		secPointWon1: +(d.secPointWon1.substring(0,d.secPointWon1.length-1)),
		secPointWon2: +(d.secPointWon2.substring(0,d.secPointWon2.length-1)),
		fastServe1: d.fastServe1,
		fastServe2: d.fastServe2,
		avgFirstServe1: d.avgFirstServe1,
		avgFirstServe2: d.avgFirstServe2,
		avgSecServe1: d.avgSecServe1,
		avgSecServe2: d.avgSecServe2,
		break1: +(d.break1.substring(0,d.break1.length-1)),
		break2: +(d.break2.substring(0,d.break2.length-1)),
		return1: d.return1,
		return2: d.return2,
		total1: d.total1,
		total2: d.total2,
		winner1: +d.winner1,
		winner2: +d.winner2,
		error1: +d.error1,
		error2: +d.error2,
		net1: d.net1,
		net2: d.net2
	};
}

d3.csv("11yearsMenUSOpenMatches.csv", row, function(error,csv_data){
	var queryString = window.location.href.substring(window.location.href.indexOf("?")+5);
	var matches = queryString.split(",");
	var player1,player2;
	var count = 0,avgFirstPointWon1 = 0,avgFirstPointWon2 = 0, avgSecondPointWon1 = 0, avgSecondPointWon2 = 0, avgBreak1 =0, avgBreak2=0,avgWinner1=0,avgWinner2=0,avgError1=0,avgError2=0;
	csv_data.forEach(function(d){
		if(matches.indexOf(d.mid)!=-1){
			player1 = d.player1;
			player2 = d.player2;
			avgFirstPointWon1+=d.firstPointWon1;
			avgFirstPointWon2+=d.firstPointWon2;
			avgSecondPointWon1+=d.secPointWon1;
			avgSecondPointWon2+=d.secPointWon2;
			avgBreak1+=d.break1;
			avgBreak2+=d.break2;
			avgWinner1+=d.winner1;
			avgWinner2+=d.winner2;
			avgError1+=d.error1;
			avgError2+=d.error2;
			count++;
		}
	});
	avgFirstPointWon1/=count;
	avgFirstPointWon2/=count;
	avgSecondPointWon1/=count;
	avgSecondPointWon2/=count;
	avgBreak1/=count;
	avgBreak2/=count;
	avgWinner1/=count;
	avgWinner2/=count;
	avgError1/=count;
	avgError2/=count;
	data = [
		{
			className: "winner",
			axes: [
				{axis:"First Point Won", value: +avgFirstPointWon1},
				{axis:"Second Point Won", value: +avgSecondPointWon1},
				{axis:"Break",value:+avgBreak1},
				{axis:"Winner",value:+avgWinner1},
				{axis:"Error",value:+avgError1}
			]
		},
		{
			className: "loser",
			axes: [
				{axis:"First Point Won", value: +avgFirstPointWon2},
				{axis:"Second Point Won", value: +avgSecondPointWon2},
				{axis:"Break",value:+avgBreak2},
				{axis:"Winner",value:+avgWinner2},
				{axis:"Error",value:+avgError2}
			]	
		}
	];
	document.getElementById("blue").innerHTML = player1;
	document.getElementById("red").innerHTML = player2;
	RadarChart.draw(".chart-container", data);
});
