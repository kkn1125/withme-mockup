'use strict';

const Withme = (function(){
    function Controller(){
        let models = null;
        let box = {};

        this.init = function(model){
            models = model;

            this.connectWithmeComponents();
            this.validBox();
            this.createContents();
        }

        this.connectWithmeComponents = function(){
            box['card-group'] = document.querySelector('.card-group');
        }

        this.validBox = function(){
            for(let inner in box){
                if(!box[inner]) delete box[inner];
            }
        }

        this.createContents = function(){
            models.createContents(box);
        }
    }
    function Model(){
        let views = null;

        this.init = function(view){
            views = view;
        }

        this.createContents = function(box){
            views.createContents(box);
        }
    }
    function View(){
        let nodes = null;
        let cardWrap = null;

        this.init = function(component){
            nodes = component;
        }

        this.createContents = function(box){
            this.createTitle();
            this.createContainer(box);
            this.addNodes();
        }

        this.createTitle = function(){
            document.title = nodes.title.render('Home');
        }

        this.createContainer = function(box){
            cardWrap = box['card-group'];
        }

        this.addNodes = function(){
            for(let key in nodes.pages){
                cardWrap.insertAdjacentHTML('beforeend', nodes.card.render(
                    nodes.pages[key]
                ));
            }
        }
    }

    return {
        init: function(){
            const components = {
                title,
                pages,
                card: withmeCard.type('simple'),
            }

            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(components);
            model.init(view);
            controller.init(model);
        }
    }
})();

// Withme.init();