<template>
    <div class="bg">
        <div style="height:46px;line-height:46px;background:#333333;color:white;padding: 0 8px;display:flex;justify-content: space-between;">
            <p>返回</p>
            <p>跳过</p>
        </div>
        <video src="" class="video" id="scaner" autoplay playsinline ></video>
        <div class="cover">
            <div class="centerViewer">
            </div>
        </div>
        <img src="" alt="" id="imgs" >
        <canvas id="canvas" style="visibility: hidden;"></canvas>
    </div>
</template>
<script>
    import jsQR from 'jsqr';
    import jsqrscanner from '../plugin/qrcode/qrScanner.js';
    export default {
        name: "QcCodeScaner",
        mounted() {
            this.scan();
        },
        methods: {
            async scan() {
                const code = await jsqrscanner('scaner', 'canvas');
                console.log('扫描结果为：', code);
            }
        }
    }
</script>
<style scoped>
    .video {
        position: fixed;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        border: #fff solid 1px;
        background: #000;
        /* visibility: hidden; */
    }
    figure {
        background-image: url('../assets/Group@2x.png');
        background-size: contain;
    }
    .cover {
        height: 100%;width: 100%;margin:0;z-index: 10;position: fixed;
        text-align: center;
        background: rgba(0, 0, 0, .5);
    }
    @keyframes scanMove {
        0%{background-size: 100% 0%}
        100%{background-size: 100% 100%}
    }
    .centerViewer {
        width: 280px;
        height: 280px;
        display: inline-block;
        margin-top: 150px;
        background: url('../assets/scan.png');
        background-repeat: no-repeat;
        background-size: 100% 0%;
        border: 1px solid goldenrod;
        animation: scanMove 2s 0;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }
    
    .bg {  
        font-size: 17px;
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    img.preview {
        margin: 20px 0;
        width: 50%;
        background: paleturquoise;
    }
    figcaption{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20px;
    }
</style>