<template>
	<div>
		<div>{{ timestamp }}</div>
		<div>{{ currentTime }}</div>
		<div>{{ timeDiff }}</div>
		<div>{{ imgName }}</div>
		<div>{{ timer }}</div>
		<div></div>
		<img
			:src="'/static/frames/frame_' + imgName + '.png'"
			alt
			class="test"
		/>
	</div>
</template>

<script>
import json from '../../tmp/data.json';

function updateJson() {
	return fetch('/.netlify/functions/json-update').then((response) => {
		return response;
	});
}

export default {
	data() {
		return {
			jsonFile: json,
			timestamp: json.timestamp,
			currentTime: 0,
			timeDiff: 0,
			imgName: '',
			nbrImg: json.nbrImg,
			timeInterval: '',
			timer: 0,
		};
	},
	methods: {
		getFrame: function() {
			this.currentTime = Math.floor(Date.now() / 1000);
			this.timeDiff = Math.round(
				(this.currentTime - this.timestamp) / 10
			).toString();
			this.format();
		},
		format: function() {
			if (this.timeDiff.length === 3) {
				this.imgName = '0' + this.timeDiff;
			} else if (this.timeDiff.length === 2) {
				this.imgName = '00' + this.timeDiff;
			} else {
				this.imgName = '000' + this.timeDiff;
			}
		},
	},
	beforeMount() {
		if (this.timestamp === undefined) {
			this.$router.push('1591830756');
			this.getFrame();
		} else {
			this.getFrame();
		}

		console.log(json);
	},
	mounted() {
		json.test = 20;
		console.log(json);

		updateJson()
			.then((response) => {
				console.log('API response', response);
				// set app state
			})
			.catch((error) => {
				console.log('API error', error);
			});

		let self = this;
		if (this.timeDiff >= this.nbrImg) {
			this.$router.push(this.currentTime);
		} else {
			this.timeInterval = setInterval(function() {
				self.timer++;
			}, 1000);
		}
	},
	updated() {
		this.getFrame();
	},
};
</script>

<style lang="scss">
.test {
	width: 500px;
}
</style>
