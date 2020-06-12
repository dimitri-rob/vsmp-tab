<template>
	<div>
		<div>init : {{ timestamp }}</div>
		<div>current : {{ currentTime }}</div>
		<div>diff : {{ timeDiff }}</div>
		<div>nbr img : {{ nbrImg }}</div>
		<div :data-timer="timer"></div>
		<img
			:src="'/static/frames/frame_' + imgName + '.png'"
			alt
			class="test"
		/>
	</div>
</template>

<script>
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
	secret: 'fnADuI1jvQACBzn4-TDv2iz7trWwHDXY3STt2FwQ',
});

export default {
	data() {
		return {
			timestamp: 0,
			currentTime: 0,
			timeDiff: 0,
			imgName: '',
			nbrImg: 0,
			timeInterval: '',
			timer: 0,
			ready: false,
		};
	},
	methods: {
		getJson: function() {
			let getJson = client.query(
				q.Get(q.Documents(q.Collection('data')))
			);
			getJson.then((response) => {
				console.log('get json : ', response.data);
				this.timestamp = response.data.timestamp;
				this.nbrImg = response.data.nbrImg;
				this.getFrame();
				this.ready = true;
			});
		},
		updateJson: function() {
			let updateJson = client.query(
				q.Update(q.Ref(q.Collection('data'), '268038425664291335'), {
					data: {
						timestamp: this.currentTime,
					},
				})
			);

			updateJson.then((response) => {
				console.log('update json : ', response.data);
				this.timestamp = this.currentTime;
			});
		},
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
		this.getJson();
	},
	mounted() {
		let self = this;
		this.timeInterval = setInterval(function() {
			self.timer++;
			self.getFrame();
		}, 1000);
	},
	updated() {
		if (this.ready === true) {
			console.log('test');

			if (this.timeDiff >= this.nbrImg) {
				this.updateJson();
			}
		}
	},
};
</script>

<style lang="scss">
.test {
	width: 500px;
}
</style>
