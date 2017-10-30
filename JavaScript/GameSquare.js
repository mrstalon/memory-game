class GameSquare{
     constructor(element, number){
         this.element = element;
         this.isOpen = false;
         this.isLocked = false;
         this.element.addEventListener("click", this, false);
         this.setColor(number);
     };

    handleEvent(e) {
        switch (e.type) {
            case "click":

                if (this.isOpen || this.isLocked) {
                    return;
                }
                if (clickController === 2) {
                    return;
                }

                ++clickController;
                this.isOpen = true;
                this.element.classList.add('flip');
                checkGame(this);
        }
    };

    reset() {
        this.isOpen = false;
        this.isLocked = false;
        this.element.classList.remove('flip');
    };

    lock() {
        this.isLocked = true;
        this.isOpen = true;
    };

    setColor(number) {
        this.element.children[0].children[1].classList.remove(this.color);
        this.color = number;
        this.element.children[0].children[1].classList.add(number);
    };

}