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
					<div class="browser__head__url">
						https://vsmp-tab.netlify.app/player
					</div>
				</div>

				<figure class="browser__frame">
					<img :src="'/static/home/home_' + count + '.jpg'" alt />
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
			hour: '09',
			count: 9,
		};
	},
	mounted() {
		let self = this;

		setInterval(() => {
			self.count++;

			let hour = self.count.toString();

			if (hour.length === 1) {
				self.hour = '0' + hour;
			} else {
				self.hour = hour;
			}

			if (self.count === 24) {
				self.count = 0;
			}
		}, 1500);
	},
};
</script>

<style lang="scss">
@import '../css/block.demo';
</style>
