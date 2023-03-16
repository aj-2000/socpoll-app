<main class="flex justify-center items-center w-screen h-screen  text-white">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-4 p-4 rounded bg-[#020202] border-[1px] border-[#323333] ">
			<form class="flex flex-col gap-6" method="POST">
				<hgroup class="flex flex-col items-center justify-center gap-2 text-center">
					<h2 class="text-3xl font-semibold font-serif cursor-pointer">Socpoll</h2>
					<h3 class="text-lg text-prim">Sign up to see polls your of friends.</h3>
				</hgroup>
				<section class="flex flex-col gap-2">
					<div class="form-control w-full max-w-xs">
						<label for="name" class="label">
							<span class="label-text text-base-100">What is your name?</span>
						</label>
						<input
							class="input input-sm w-full max-w-xs bg-base-content border-base-300"
							type="text"
							id="name"
							name="name"
							required
						/>
					</div>

					<div class="form-control w-full max-w-xs">
						<label for="username" class="label">
							<span class="label-text text-base-100">Pick a username</span>
						</label>
						<input
							class="input input-sm w-full max-w-xs bg-base-content border-base-300 "
							type="text"
							id="username"
							name="username"
							required
						/>
					</div>

					<div class="form-control w-full max-w-xs">
						<label for="password" class="label">
							<span class="label-text text-base-100">Password</span>
						</label>
						<input
							class="input input-sm w-full max-w-xs bg-base-content border-base-300"
							type="text"
							id="password"
							name="password"
							required
						/>
					</div>
				</section>

				<button
					class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
					type="submit">Register</button
				>
			</form>
		</div>
		<div
			class="flex flex-col gap-4 p-4 rounded bg-base-content border-[1px] border-[#323333] text-base"
		>
			<p>
				Already have an account? <a
					class="link-primary link-hover text-base-100 hover:text-base-300"
					href="/login">Login</a
				>
			</p>
		</div>
	</div>
</main>
