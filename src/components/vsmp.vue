<template>
	<section class="vsmp">
		<figure class="vsmp__frame">
			<img
				class="vsmp__frame__img"
				:src="'http://frames.dimic.eu/'+ currentMovieId +'/frame-'+ imgCount +'.jpg'"
			/>
		</figure>
		<section class="vsmp__infos">
			<strong>{{ currentMovie }}</strong>
			by
			<em>{{ currentMovieDirector }}</em>
		</section>
		<div v-if="dev" class="vsmp__dev">
			<div>init : {{ timestamp }}</div>
			<div>current : {{ currentTime }}</div>
			<div>diff : {{ timeDiff }}</div>
			<div>img count : {{ imgCount }}</div>
			<div>nbr img : {{ nbrImg }}</div>
			<div :data-timer="timer"></div>
		</div>
	</section>
</template>

<script>
import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
	secret: "fnADuI1jvQACBzn4-TDv2iz7trWwHDXY3STt2FwQ"
});

export default {
	data() {
		return {
			dev: false,
			movie: [
				{
					name: "Ford vs Ferrari",
					id: "ford-vs-ferrari",
					img: 9155,
					director: "James Mangold"
				}
			],
			timestamp: 0,
			currentTime: 0,
			timeDiff: 0,
			imgCount: 0,
			currentMovie: "",
			currentMovieId: "",
			currentMovieDirector: "",
			nbrImg: 0,
			timeInterval: "",
			timer: 0,
			ready: false
		};
	},
	methods: {
		getJson: function() {
			let getJson = client.query(
				q.Get(q.Documents(q.Collection("data")))
			);
			getJson.then(response => {
				console.log("get json : ", response.data);
				this.timestamp = response.data.timestamp;
				this.nbrImg = response.data.nbrImg;
				this.currentMovie = response.data.movie;
				this.currentMovieId = response.data.movieid;
				this.currentMovieDirector = response.data.director;
				this.getFrame();
				this.ready = true;
			});
		},
		changeMovie: function() {
			let newMovie = Math.floor(
				Math.random() * Math.floor(this.movie.length)
			);

			this.timestamp = this.currentTime;
			this.currentMovie = this.movie[newMovie].name;
			this.currentMovieId = this.movie[newMovie].id;
			this.nbrImg = this.movie[newMovie].img;
			this.currentMovieDirector = this.movie[newMovie].director;

			let updateJson = client.query(
				q.Update(q.Ref(q.Collection("data"), "268038425664291335"), {
					data: {
						timestamp: this.currentTime,
						movie: this.movie[newMovie].name,
						movieid: this.movie[newMovie].id,
						nbrImg: this.movie[newMovie].img,
						director: this.movie[newMovie].director
					}
				})
			);

			updateJson.then(response => {
				console.log("update json : ", response.data);
			});
		},
		getFrame: function() {
			this.currentTime = Math.floor(Date.now() / 10);
			this.timeDiff = Math.round(
				(this.currentTime - this.timestamp) / 100
			);
			this.imgCount = this.timeDiff + 1;
		}
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
	}
};
</script>

<style lang="scss">
@import "../css/page.vsmp";
</style>
