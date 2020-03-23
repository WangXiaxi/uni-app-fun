<view class="content">
	<view class="big-title">最近通话</view>
	<view class="list">
		<view class="item">
			<view class="name">{{item.answer_name}}</view>
			<view class="mobile">
				<view class="tell">{{item.answer}}</view>
				<view class="date">{{item.time}} 呼出</view>
				<image class="trans" src="../../static/arrow-phone.png"></image>
			</view>
		</view>
	</view>
</view>

<script>
	import empty from '@/components/empty'
	// import phoneModel from '../../../api/phone/index.js'
	export default {
		components: {
			empty
		},
		props: {
		},
		data() {
			return {
				list: []
			}
		}
	}
</script>