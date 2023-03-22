<div class="bg-base-content w-full h-full flex justify-center p-8">
	<div class=" h-full w-[75%] grid grid-cols-12  text-white border-[1px] border-[#323333] rounded ">
		<div class="w-full col-span-3  overflow-auto border-r-[1px] border-[#323333] py-6">
			<div class="w-full flex justify-center items-center pb-6 px-6 border-b border-[#323333]">
				<span class="w-full text-4xl font-bold font-sans text-center">Settings</span>
			</div>
			<div class="flex flex-col py-2">
				<a href="profile" class="flex justify-start gap-3 px-8 py-3  btn-ghost ">
					<span class="w-full text-md font-normal">Edit Profile</span>
				</a>

				<a href="password" class="flex justify-start gap-3 px-8 py-3 btn-ghost">
					<span class="w-full text-md font-normal">Change Password</span>
				</a>
			</div>
		</div>

		<div class="col-span-9 px-20 py-8 overflow-auto">
			<slot />
		</div>
	</div>
</div>
