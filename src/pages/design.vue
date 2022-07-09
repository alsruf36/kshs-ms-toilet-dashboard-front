<script setup lang="ts">
import { useToilet } from "~/store/toilet";

const toilets = useToilet();
const ToiletUpdater = setInterval(async () => {
  await toilets.fetchToilets();
}, 500)
</script>

<template>
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <img src="https://play.tailwindcss.com/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
    <div class="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    <div class="relative bg-white px-6 pt-3 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 text-center">
        <div class="mx-auto max-w-md">
        <div class="divide-y divide-gray-300/50">
            <h1 class="underline decoration-indigo-500 text-5xl font-bold m-5">화장실 현황</h1>
            <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
            <p class="underline decoration-sky-500 text-lg">화장실의 화장지와 변기 수위를 모니터링 합니다.</p>
            <ul class="space-y-4">
                <li class="text-center">
                    <div v-for="item in toilets.toilets" :key="item.id">
                        <p>화장실 ID : {{item.id}}</p>
                        <p>화장지 돌아간 횟수 : {{item.rotation}}</p>
                        <div v-if="item.flush === true">
                            <p>물이 내려가는 중 입니다!</p>
                            <p>{{ Math.floor(Date.now() / 1000) - item.flushTime }}초 동안 내려가는 중 입니다.</p>
                            <div v-if="Math.floor(Date.now() / 1000) - item.flushTime > 10">
                                <p>변기가 막혔습니다!</p>
                            </div>
                        </div>

                        <div v-else>
                            <p>화장실이 사용가능합니다.</p>
                        </div>
                    </div>
                </li>
            </ul>
            </div>
            <div class="pt-8 text-base font-semibold leading-7">
            <p class="text-gray-900">실시간으로 안보이시나요?</p>
            <p>
                <a href="https://toilet.kshs.dev" class="text-sky-500 hover:text-sky-600">새로고침 하기 &rarr;</a>
            </p>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>