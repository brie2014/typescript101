var DrawingApp = /** @class */ (function () {
    function DrawingApp(canvas, context) {
        this.toolBarHeight = 64;
        this.isDrawing = false;
        // Resize canvas to size of window
        canvas.height = window.innerHeight - this.toolBarHeight;
        canvas.width = window.innerWidth;
        // Set default drawing properties
        context.globalCompositeOperation = "source-over";
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;
        context.fillStyle = "white";
        // set class properties
        this.canvas = canvas;
        this.context = context;
        // Add event handlers
        this.createUserEvents();
        this.createToolbarEvents();
    }
    DrawingApp.prototype.createUserEvents = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", function (e) { return _this.startDrawing(e); });
        canvas.addEventListener("mouseup", function (e) { return _this.endDrawing(e); });
        canvas.addEventListener("mousemove", function (e) { return _this.draw(e); });
    };
    DrawingApp.prototype.createToolbarEvents = function () {
        var _this = this;
        var clearButton = document.getElementById('clear');
        clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", function () { return _this.clearCanvas(); });
        var saveButton = document.getElementById('save');
        saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", function () { return _this.saveCanvas(); });
        var colorPicker = document.getElementById('colorPicker');
        colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.addEventListener("change", function (e) { return _this.context.strokeStyle = e.target.value; });
        var pencilTool = document.getElementById('pencilTool');
        pencilTool === null || pencilTool === void 0 ? void 0 : pencilTool.addEventListener("click", function () {
            _this.context.globalCompositeOperation = "source-over";
        });
        var brushTool = document.getElementById('brushTool');
        brushTool === null || brushTool === void 0 ? void 0 : brushTool.addEventListener("click", function () {
            _this.context.globalCompositeOperation = "multiply";
        });
        var eraserTool = document.getElementById('eraserTool');
        eraserTool === null || eraserTool === void 0 ? void 0 : eraserTool.addEventListener("click", function () { return _this.context.globalCompositeOperation = "destination-out"; });
        var brushSize = document.getElementById('brushSize');
        brushSize === null || brushSize === void 0 ? void 0 : brushSize.addEventListener("change", function (e) { return _this.context.lineWidth = Number(e.target.value); });
    };
    DrawingApp.prototype.draw = function (e) {
        var context = this.context;
        if (!this.isDrawing)
            return;
        context === null || context === void 0 ? void 0 : context.lineTo(e.clientX, e.clientY - this.toolBarHeight);
        context === null || context === void 0 ? void 0 : context.stroke();
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.moveTo(e.clientX, e.clientY - this.toolBarHeight);
    };
    DrawingApp.prototype.startDrawing = function (e) {
        this.isDrawing = true;
        this.draw(e);
    };
    DrawingApp.prototype.endDrawing = function (e) {
        var _a;
        this.isDrawing = false;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
    };
    DrawingApp.prototype.clearCanvas = function () {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.isDrawing = false;
    };
    DrawingApp.prototype.saveCanvas = function () {
        var link = document.createElement('a');
        var dataURL = this.canvas.toDataURL('image/png');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
    };
    return DrawingApp;
}());
// Load the drawing app when the page loads
window.addEventListener("load", function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    // We can't create the drawing app without both a canvas and a context
    if (!canvas || !context)
        return;
    new DrawingApp(canvas, context);
});
