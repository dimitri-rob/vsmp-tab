<template>
	<div class="home">
		<section class="home__wrap">
			<header class="home__head">
				<h1 class="home__title">VSMP Tab</h1>
				<h2 class="home__subtitle">
					a movie played very slooooooooooooooowly
					<br />in your browser tab
				</h2>
			</header>

			<main class="home__content">
				<div class="home__intro">
					<div class="home__excerpt">
						<p>
							A new frame from a movie is displayed every hour in
							your browser.
						</p>
						<p>
							Use the
							<a href="https://addons.mozilla.org/addon/vsmp-tab/" target="_blank">Firefox add-on</a> and display current frame each time you
							open a new window or tab. It is safe
							for work.
						</p>
						<p>
							<small>
								Based on
								<a
									href="https://medium.com/s/story/very-slow-movie-player-499f76c48b62"
									target="_blank"
								>Bryan Boyer’s idea</a>
							</small>
						</p>
					</div>

					<div class="home__cta">
						<router-link :to="{ name: 'Watch' }" class="home__cta__btn">watch movie</router-link>
						<span class="home__cta__txt">
							<a href="https://addons.mozilla.org/addon/vsmp-tab/" target="_blank">
								or use
								<br />Firefox add-on
							</a>
						</span>
					</div>
				</div>

				<div class="home__demo">
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
@import "../css/page.home";
</style>
