<template>
	<div>
		<div>{{ currentMovie }}</div>
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
			nbrMovies: 3,
			moviesName: ['Moon', 'Back to the Future', 'The Blues Brothers'],
			moviesImg: [3, 4, 2],
			timestamp: 0,
			currentTime: 0,
			timeDiff: 0,
			imgName: '',
			currentMovie: '',
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
				this.currentMovie = response.data.movie;
				this.getFrame();
				this.ready = true;
			});
		},
		changeMovie: function() {
			let newMovie = Math.floor(
				Math.random() * Math.floor(this.nbrMovies)
			);

			this.timestamp = this.currentTime;
			this.currentMovie = this.moviesName[newMovie];
			this.nbrImg = this.moviesImg[newMovie];

			let updateJson = client.query(
				q.Update(q.Ref(q.Collection('data'), '268038425664291335'), {
					data: {
						timestamp: this.currentTime,
						movie: this.moviesName[newMovie],
						nbrImg: this.moviesImg[newMovie],
					},
				})
			);

			updateJson.then((response) => {
				console.log('update json : ', response.data);
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
			if (this.timeDiff >= this.nbrImg) {
				this.changeMovie();
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
