describe('fn-block-ui', function() {
    var compile, scope, timeout;
    
    beforeEach(function(){
        module('fn.block-ui');

        inject(function($compile, $rootScope, $timeout){
            compile = $compile;
            scope = $rootScope.$new();
            timeout = $timeout;
        });
    });
    
    afterEach(function () {
        scope.$destroy();
        
        // Clear any timeout
        try {
            timeout.verifyNoPendingTasks();
        } catch ( aException ) {
            timeout.flush();
        }
    });
    
    describe('core tests', function () {
        var directiveElem, blockUiConstants, blockUiService;
    
        beforeEach(function(){
            inject(function(fnBlockUiConstants, fnBlockUi){
                blockUiConstants = fnBlockUiConstants;
                blockUiService = fnBlockUi;
            });

            directiveElem = getCompiledElement();
        });

        function getCompiledElement(){
            var element = angular.element('<div fn-block-ui="testing"><p id="userContent">Something here.</p></div>');
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
        
        it('should have visible class when service is called with timeout', function () {
            expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);

            // Block for 5 seconds
            blockUiService('testing', 5000);
            scope.$digest();

            expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(true);
        });
        
        it('should not have visible class after timeout', function () {
            expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);

            // Block for 5 seconds
            blockUiService('testing', 5000);
            scope.$digest();
            
            // Simulate waiting for 5 seconds
            timeout.flush(5000);

            expect(directiveElem.hasClass(blockUiConstants.visibleClass)).toEqual(false);
        });
        
        it('should not override user content', function () {
            expect(directiveElem.find('p').attr('id')).toEqual('userContent');
            expect(directiveElem.find('p').text()).toEqual('Something here.');
        });
    });
    
    describe('customization tests', function () {
        var blockUiConstants, blockUiService, templateCache;
        var blockUiConstantsCache;
    
        beforeEach(function(){
            inject(function(fnBlockUiConstants, fnBlockUi, $templateCache){
                blockUiConstants = fnBlockUiConstants;
                blockUiService = fnBlockUi;
                templateCache = $templateCache;
                
                // Cache attributes because they may change.
                blockUiConstantsCache = angular.copy(blockUiConstants);
            });
        });
        
        afterEach(function () {
            // Put cached attributes back.
            angular.copy(blockUiConstantsCache, blockUiConstants);
        });
        
        it('should use template from attr', function () {
            templateCache.put('customTemplate.html', '<div id="customTemplateId">Custom Template</div>');
            
            var element = '<div fn-block-ui="testing" fn-block-ui-template="customTemplate.html"></div>';
            element = compile(element)(scope);
            scope.$digest();
            
            expect(element[0].querySelector('#customTemplateId')).toBeDefined();
            
            var customTemplate = angular.element(element[0].querySelector('#customTemplateId'));
            expect(customTemplate.text()).toEqual('Custom Template');
        });
        
        it('should use default message in custom template', function () {
            blockUiConstants.message = 'Hello';
            templateCache.put('customTemplate.html', '<div id="customTemplateId">{{instance.message}} World!</div>');
            
            var element = '<div fn-block-ui="testing" fn-block-ui-template="customTemplate.html"></div>';
            element = compile(element)(scope);
            scope.$digest();
            
            expect(element[0].querySelector('#customTemplateId')).toBeDefined();
            
            var customTemplate = angular.element(element[0].querySelector('#customTemplateId'));
            expect(customTemplate.text()).toEqual('Hello World!');
        });
        
        it('should not use default message in custom template if it is defined in directive', function () {
            blockUiConstants.message = 'Hello';
            templateCache.put('customTemplate.html', '<div id="customTemplateId">{{instance.message}} World!</div>');
            
            var element = '<div fn-block-ui="testing" fn-block-ui-template="customTemplate.html" fn-block-ui-message="Hi"></div>';
            element = compile(element)(scope);
            scope.$digest();
            
            expect(element[0].querySelector('#customTemplateId')).toBeDefined();
            
            var customTemplate = angular.element(element[0].querySelector('#customTemplateId'));
            expect(customTemplate.text()).not.toEqual('Hello World!');
            expect(customTemplate.text()).toEqual('Hi World!');
        });
    });
});