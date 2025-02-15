// socket.io work
const users = new Map();
const publicSocket = (io) => {
    io.on("connection", (socket) => {
        users.set(socket.id, {
            startTime: null,
            testContent: "Justin Bieber is one of the most iconic pop stars of our generation, and fans around the world are always curious about his life, including where he lives. Known for his chart-topping hits and captivating performances, Bieber has become a household name since his discovery on YouTube in 2008. ",
            totalChars: 0,
            correctChars: 0
        })
        socket.on("askingForTest", () => {
            socket.emit("testContent", users.get(socket.id).testContent);
        })
        socket.on("startTime", () => {
            console.log("Hello world")
            console.log(`${socket.id} started test...`);
            const user = users.get(socket.id);
            user.startTime = Date.now();
            users.set(socket.id, user)
        });
        socket.on("typing", (typingText) => {
            const user = users.get(socket.id);
            if (!user.startTime) return;
            const expected = user.testContent;
            user.totalChars = typingText.length;
            user.correctChars = Array.from(typingText).reduce((acc, currentVal, index) => {
                return currentVal === expected[index] ? acc + 1 : acc
            }, 0)
            const elapsedTime = (Date.now() - user.startTime) / 1000; // in seconds
            const wpm = Math.round((user.correctChars / 5) / (elapsedTime / 60));
            const accuracy = Math.round((user.correctChars / user.totalChars) * 100);
            socket.emit("liveResults", {
                userId: socket.id,
                wpm,
                accuracy
            })
        });
        // this get disconnected only when user leaves page.
        socket.on('disconnect', () => {
            users.delete(socket.id);
            console.log(`User disconnected: ${socket.id}`);
        });
    })
}
module.exports = publicSocket