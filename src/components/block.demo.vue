<template>
	<div class="demo">
		<div class="demo__content">
			<div class="demo__browser">
				<img
					class="demo__browser__bar"
					src="../assets/browser.png"
					srcset="../assets/browser@2x.png 2x"
					alt
				/>

				<figure class="demo__browser__img">
					<img :src="'/static/home/home_' + hour + '.png'" alt />
				</figure>
			</div>

			<div class="demo__clock" :data-count="count">
				<span>{{ hour }}</span>
				<span>00</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			hour: "09",
			count: 9
		};
	},
	mounted() {
		console.log("test");
		let self = this;

		setInterval(() => {
			self.count++;

			let hour = self.count.toString();

			if (hour.length === 1) {
				self.hour = "0" + hour;
			} else {
				self.hour = hour;
			}

			if (self.count === 24) {
				self.count = 0;
			}
		}, 1000);
	}
};
</script>

<style lang="scss">
@import "../css/block.demo";
</style>