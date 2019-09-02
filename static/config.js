const config = {
    editorOption: {
        debug: "info",
        modules: {
            toolbar: [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
                { header: [1, 2, 3, 4, 5, 6, false] },
                { size: ["small", false, "large", "huge"] },
                { font: [] },
                { direction: "rtl" },
                { script: "sub" },
                { script: "super" },
                { indent: "-1" },
                { indent: "+1" },
                { list: "ordered" },
                { list: "bullet" },
                { color: [] },
                { background: [] },
                { align: [] },
                "image",
                "video",
                "clean"
            ]
        },
        placeholder: "请输入内容",
        theme: "snow"
    },
    baiduMap: {
        ak: "yvHBN7cRIeYG9TIWMfOuVMk4Z2w1uXnK"
    }
}