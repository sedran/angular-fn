describe('fn-block-ui', function() {
    var compile, scope, directiveElem, blockUiConstants, blockUiService;
    
    beforeEach(function(){
        module('fn.block-ui');

        inject(function($compile, $rootScope, fnBlockUiConstants, fnBlockUi){
            compile = $compile;
            scope = $rootScope.$new();
            blockUiConstants = fnBlockUiConstants;
            blockUiService = fnBlockUi;
        });

        directiveElem = getCompiledElement();
    });
    
    afterEach(function () {
        scope.$destroy();
    });
    
    function getCompiledElement(){
        var element = angular.element('<div fn-block-ui="testing"><p>Something here.</p></div>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }
    
    it('should have block-ui class', function () {
        expect(directiveElem.hasClass(blockUiConstants.elementClass)).toEqual(true);
    });
    
    it('should have container element', function () {
        var elements = directiveElem[0].querySelectorAll('.' + blockUiConstants.containerClass);
        
        expect(elements).toBeDefined();
        expect(elements.length).toEqual(1);
    });
    
    it('should not be visible initially', function () {
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);
    });
    
    it('should have visible class when service is called', function () {
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);
        
        blockUiService('testing');
        scope.$digest();
        
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(true);
    });
    
    it('should not have visible class when service return function is called', function () {
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);
        
        var unblockFunction = blockUiService('testing');
        scope.$digest();
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(true);
        
        unblockFunction();
        scope.$digest();
        expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);
    });
});