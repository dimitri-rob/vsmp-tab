<template>
	<div class="demo">
		<div class="demo__content">
			<div class="browser">
				<div class="browser__head">
					<div class="browser__head__btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="browser__head__url">https://vsmp-tab.netlify.app/player</div>
				</div>

				<figure class="browser__frame">
					<img :src="'/static/home/home_' + countH + '.jpg'" alt />
				</figure>
			</div>

			<div class="clock">
				<span>{{ timeH }}</span>
				<span>:</span>
				<span>{{ timeS }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			countH: 9,
			countS: 0,
			timeH: "09",
			timeS: "00"
		};
	},
	methods: {
		timeCount: function(type, count, max) {
			if (count === max - 1) {
				count = 0;
			} else {
				count++;
			}

			let time = count.toString();
			if (time.length === 1) {
				time = "0" + time;
			}

			if (type === "hour") {
				this.countH = count;
				this.timeH = time;
			} else if (type === "seconds") {
				this.countS = count;
				this.timeS = time;
			}
		}
	},
	mounted() {
		let self = this;

		this.hourInterval = setInterval(() => {
			self.timeCount("hour", this.countH, 24);
		}, 1500);

		this.secondsInterval = setInterval(() => {
			self.timeCount("seconds", this.countS, 60);
		}, 15);
	}
};
</script>

<style lang="scss">
@import "../css/block.demo";
</style>
