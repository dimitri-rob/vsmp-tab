<template>
	<div class="main">
		<section class="main__wrap">
			<header class="main__head">
				<h1 class="main__title">VSMP TAB</h1>
				<h2 class="main__subtitle">
					a movie played very slooooooooooooooowly
					<br />in your browser tab
				</h2>
			</header>

			<main class="main__content">
				<div class="main__intro">
					<div class="main__excerpt">
						Based on
						<a
							href="https://medium.com/s/story/very-slow-movie-player-499f76c48b62"
							target="_blank"
						>Bryan Boyer’s idea</a>, get a new frame from a movie
						each hour when you open a new tab in your browser. It is
						safe for work.
					</div>

					<div class="main__cta">
						<div>
							<router-link :to="{ name: 'app' }" class="main__cta__btn">watch movie</router-link>
							<span class="main__cta__txt">and add it as start page</span>
						</div>
					</div>
				</div>

				<div class="main__demo">
					<Demo></Demo>
				</div>
			</main>
		</section>
	</div>
</template>

<script>
import Demo from "./block.demo";

export default {
	components: { Demo }
};
</script>

<style lang="scss">
@import "../css/_variables";
@import "../css/_fonts";
@import "../css/page.main";
</style>
