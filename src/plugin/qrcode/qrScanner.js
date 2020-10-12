import jsQR from 'jsqr';

function getQRCode(video, canvasId) {
        let canvas = document.querySelector('#' + canvasId);
        let ctx = canvas.getContext('2d');
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        console.log(video.clientWidth, video.clientHeight)
        let imagData = ctx.getImageData(0, 0, video.clientWidth, video.clientHeight);
        const code = jsQR(imagData.data, video.clientWidth, video.clientHeight);
        return code;
}

export default async function qrCodeScanner(videoId, canvasId) {
    let video = document.querySelector('#' + videoId);
    const constraints = {
        audio: false,
        // video: {
        //     width: video.clientWidth,
        //     height: video.clientHeight,
        //     facingMode: { exact: "environment" }
        // },
        video: {
            facingMode: {
                exact: "environment",
                // width: 1080,
                // height: 1920
                // width: { 'min': video.clientWidth },
                // height: { 'min': video.clientHeight }
                width: video.clientWidth,
                height: video.clientHeight
            }
        }
    };
    console.log(constraints);
    try {
        const mediaStream = await openMediaDevices(constraints);
        video.srcObject = mediaStream;
        video.onloadedmetadata = async function (e) {
            video.play();
            const result = await startScan(video, canvasId, mediaStream);
            console.log('result：', result)
            return result;
        };
        const result = await video.onloadedmetadata();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 打开对应摄像头
async function openMediaDevices(constraints) {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
    return await navigator.mediaDevices.getUserMedia(constraints);
}

function startScan(video, canvasId, mediaStream) {
    let handleId = null;
    return new Promise((resolve, reject) => {
        function scan() {
            try {
                const result = getQRCode(video, canvasId);
                console.log(result);
                if (result) {
                    video.pause();
                    const track = mediaStream.getVideoTracks()[0];
                    track.stop();
                    if (handleId){
                        cancelAnimationFrame(handleId);
                    }
                    mediaStream.getVideoTracks()[0].stop();
                    resolve(result)
                }else {
                    handleId = requestAnimationFrame(scan);
                }
            } catch (error) {
                console.log(error);
                handleId = requestAnimationFrame(scan);
            }
            
        }
        scan();
    })
}