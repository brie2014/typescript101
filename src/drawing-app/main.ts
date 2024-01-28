class DrawingApp {
    private toolBarHeight: number = 64;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private isDrawing: boolean = false;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        // Resize canvas to size of window
        canvas.height = window.innerHeight - this.toolBarHeight;
        canvas.width = window.innerWidth;

        // Set default drawing properties
        context.globalCompositeOperation = "source-over"
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;
        context.fillStyle = "white";

        // set class properties
        this.canvas = canvas;
        this.context = context;

        // Add event handlers
        this.createDrawingEvents();
        this.createToolbarEvents();

    }

    // Add drawing event handlers
    private createDrawingEvents() {
        let canvas = this.canvas;
        canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
        canvas.addEventListener("mouseup", (e) => this.endDrawing(e));
        canvas.addEventListener("mousemove", (e) => this.draw(e));
    }

    // Add toolbar event handlers
    private createToolbarEvents() {
        const clearButton = document.getElementById('clear')
        clearButton?.addEventListener("click", () => this.clearCanvas());

        const saveButton = document.getElementById('save')
        saveButton?.addEventListener("click", () => this.saveCanvas());

        const colorPicker = document.getElementById('colorPicker')
        colorPicker?.addEventListener("change", (e) => this.context.strokeStyle = (e.target as HTMLInputElement).value);

        const pencilTool = document.getElementById('pencilTool')
        pencilTool?.addEventListener("click", () => {
            this.context.globalCompositeOperation = "source-over"
        });

        const brushTool = document.getElementById('brushTool')
        brushTool?.addEventListener("click", () => {
            this.context.globalCompositeOperation = "multiply"
        });

        const eraserTool = document.getElementById('eraserTool')
        eraserTool?.addEventListener("click", () => this.context.globalCompositeOperation = "destination-out");


        const brushSize = document.getElementById('brushSize')
        brushSize?.addEventListener("change", (e) => this.context.lineWidth = Number((e.target as HTMLSelectElement).value));
    }

    private draw(e: MouseEvent) {
        let context = this.context;
        if (!this.isDrawing) return;
        context?.lineTo(e.clientX, e.clientY - this.toolBarHeight);
        context?.stroke();
        context?.beginPath();
        context?.moveTo(e.clientX, e.clientY - this.toolBarHeight);
    }

    private startDrawing(e: MouseEvent) {
        this.isDrawing = true;
        this.draw(e);
    }

    private endDrawing(e: MouseEvent) {
        this.isDrawing = false;
        this.context?.beginPath();
    }

    private clearCanvas() {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.isDrawing = false;
    }

    private saveCanvas() {
        const link = document.createElement('a');
        const dataURL = this.canvas.toDataURL('image/png');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
    }

}

// Load the drawing app when the page loads
window.addEventListener("load", () => {
    const canvas = document.getElementById('canvas') as
        HTMLCanvasElement;
    const context = canvas.getContext("2d");

    // We can't create the drawing app without both a canvas and a context
    if (!canvas || !context) return
    new DrawingApp(canvas, context);
})

