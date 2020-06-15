<template>
	<section class="watch">
		<figure class="watch__frame">
			<img
				class="watch__frame__img"
				:src="'http://frames.dimic.eu/'+ currentMovieSlug +'/frame-'+ imgCount +'.jpg'"
				rel="preload"
			/>
		</figure>
		<section class="watch__infos watch__infos--frames">{{ imgCount }} / {{ nbrImg }} frames</section>
		<section class="watch__infos watch__infos--movie">
			<strong>{{ currentMovie }}</strong>
			by
			<em>{{ currentMovieDirector }}</em>
		</section>
		<div v-if="dev" class="watch__dev">
			<div>init : {{ timestamp }}</div>
			<div>current : {{ currentTime }}</div>
			<div>diff : {{ timeDiff }}</div>
			<div>img count : {{ imgCount }}</div>
			<div>nbr img : {{ nbrImg }}</div>
			<div>timer : {{ timer }}</div>
		</div>
	</section>
</template>

<script>
import faunadb from "faunadb";
import movieList from "../assets/movie.json";

const q = faunadb.query;
const client = new faunadb.Client({
	secret: "fnADuI1jvQACBzn4-TDv2iz7trWwHDXY3STt2FwQ"
});

export default {
	data() {
		return {
			dev: false,
			timestamp: 0,
			currentTime: 0,
			timeDiff: 0,
			imgCount: 0,
			framePerSec: 3600,
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
				this.nbrImg = movieList[response.data.id].img;
				this.currentMovie = movieList[response.data.id].name;
				this.currentMovieSlug = movieList[response.data.id].slug;
				this.currentMovieDirector =
					movieList[response.data.id].director;
				this.getFrame();
				this.ready = true;
			});
		},
		changeMovie: function() {
			let newMovie = Math.floor(
				Math.random() * Math.floor(movieList.length)
			);

			this.timestamp = this.currentTime;
			this.currentMovie = movieList[newMovie].name;
			this.currentMovieSlug = movieList[newMovie].slug;
			this.nbrImg = movieList[newMovie].img;
			this.currentMovieDirector = movieList[newMovie].director;

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
			this.currentTime = Math.floor(Date.now() / 1000);

			this.timeDiff = Math.floor(
				(this.currentTime - this.timestamp) / this.framePerSec
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
@import "../css/page.watch";
</style>
