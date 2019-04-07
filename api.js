$(document).ready(function() {
	$('#the-file').change(function() {
		$('#img')
			.attr('src', 'snoop.jpg')
		        .height(200);
	});
	$('#btn').click(function() {
		var fileInput = document.getElementById('the-file');
		var file = fileInput.files[0];
		var formData = new FormData();
		formData.append('file', file);
		$.ajax({
			type: 'POST',
			url: 'https://northeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/a5b4f782-2a6d-4fb3-ba5d-340eca7d47e6/classify/iterations/CatDog/url',
			//url: 'https://northeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/a5b4f782-2a6d-4fb3-ba5d-340eca7d47e6/classify/iterations/CatDog/image',
			beforeSend: function(xhrObj){
                		xhrObj.setRequestHeader("Content-Type","application/json");
                		//xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                		xhrObj.setRequestHeader("Prediction-Key", '785a16bcc99246d888cfdb01594d9cd7');
            		},
			data: '{"url": "https://www.famousbirthdays.com/faces/dogg-snoop-image.jpg"}',
			//data: formData,
			//processData: false,
			//contentType: 'application/octet-stream',
			success: function(response) {
				var results = []
				var test = response.predictions;
				//alert(test[0].tagName + ' ' + test[0].probability);
				results.push(parseFloat(test[0].probability));
				results.push(parseFloat(test[1].probability));
				results.push(parseFloat(test[2].probability));
				results.push(parseFloat(test[3].probability));
				results.push(parseFloat(test[4].probability));
				results.push(parseFloat(test[5].probability));
				results.push(parseFloat(test[6].probability));
				results.push(parseFloat(test[7].probability));
				results.push(parseFloat(test[8].probability));
				var index = 0;
				var max = 0;
				for (var i = 0; i < results.length; i++) {
        				if (results[i] > max) {
						index = i;
						max = results[i];
					}
    				}
				var des = desc(test[index].tagName);
				$('#predictionMessage').show();
				$('#prediction').html(test[index].tagName);
				$('#image').show();
				$('#description').html(des);
				$('#description').show();
				$('#readMore').show();
				$('#otherSug').show();
			},
			error: function(response) {
				alert(JSON.stringify(response));
			},
			dataType: 'json'
		});
	});
	$('#otherSug').click(function() {
		$('#otherDog').show();
		var des = desc('husky');
		$('#description2').html(des);
	});
	function desc(tagName) {
		if (tagName === 'labrador') {
			var html =
				'Holla Friend! I am';
			return html;
		} else if (tagName === 'chihuahua') {
			var html =
				'Hi, my name is TinyBeans, and I am a loving TinyDog, who is full of personality and very energetic, (you can call me TD), I am 1 and a half years old '+
				'good with kids. I really want to give lots of love all the time but sometimes I am not sure how to show it. I shake a lot, but don’t get confused I am a fearless dog and will do my best to protect you.';
			return html; 
		} else if (tagName === 'newfoundland') {
			var html =
				'Hi there, my name is Chewy, '+
				'I drool sometimes, but probably just when I think about all the great snacks I will get soon. I am the sweetest dog, and always loyal to my family. I cant wait to go swimming and hope you have a pool!';
			return html;
		} else if (tagName === 'husky') {
			var html =
				'Hi there, My name is Jon Snow, my very important features:<br/>'+
				'I am made to be trekking (through 1 metre of snow),<br/>'+
				'I need to be exercised for at least 6 hours a day (Or else i will eat your couch)<br/>'+
				'You must know is that i am a well known singer<br/>'+
				'I will love you and give you kisses every day, as well listen to you (sometimes)<br/>';
			return html;
		} else if (tagName === 'dane') {
			return '';
		} else if (tagName === 'poodle') {
			return '';
		} else if (tagName === 'pug') {
			var html = 
				'Hi there! My name is Elvis Pugsley.<br/>'+
				'Look at my face! This face will try and get treats from you all the time!';	
			return html;
		} else if (tagName === 'bulldog') {
			return '';
		} else if (tagName === '') {
			return '';
		} else {
			return 'not found :(';
		}
	}
});
