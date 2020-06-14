<template>
	<section class="vsmp">
		<figure class="vsmp__frame">
			<img
				class="vsmp__frame__img"
				:src="'http://frames.dimic.eu/'+ currentMovieSlug +'/frame-'+ imgCount +'.jpg'"
				rel="preload"
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
					slug: "ford-vs-ferrari",
					img: 9155,
					director: "James Mangold"
				}
			],
			timestamp: 0,
			currentTime: 0,
			timeDiff: 0,
			imgCount: 0,
			currentMovie: "",
			currentMovieSlug: "",
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
				this.nbrImg = this.movie[response.data.id].img;
				this.currentMovie = this.movie[response.data.id].name;
				this.currentMovieSlug = this.movie[response.data.id].slug;
				this.currentMovieDirector = this.movie[
					response.data.id
				].director;
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
			this.currentMovieSlug = this.movie[newMovie].slug;
			this.nbrImg = this.movie[newMovie].img;
			this.currentMovieDirector = this.movie[newMovie].director;

			let updateJson = client.query(
				q.Update(q.Ref(q.Collection("data"), "268038425664291335"), {
					data: {
						timestamp: this.currentTime,
						id: newMovie
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
