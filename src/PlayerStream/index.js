import React from 'react';
import { LivePlayer } from "react-native-live-stream";

const Stream = () => {
    return (
        <LivePlayer source={{ uri: "https://node-12.zeno.fm/0ts10q1z61zuv?rj-ttl=5&rj-tok=AAABct5ON64AKNeoWiPPVng5RQ" }}

            style={{ flex: 1 }}
            paused={false}
            muted={false}
            bufferTime={300}
            maxBufferTime={1000}
            resizeMode={"contain"}
            onLoading={() => { }}
            onLoad={() => { }}
            onEnd={() => { }}
        />
    );
}

export default Stream;