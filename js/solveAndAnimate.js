var animSpeed = 250;
var successMessage = "<span class=\"success\">Congratulations!</span><br/> Your name can be completely constructed from the Periodic Table of Elements!";
var fakeMessage = "Uh oh, not all letters in your name can be found in the Periodic Table..<br/>but how about throwing some <span style=\"color: rgba(231, 76, 60,1.0);\">fake elements</span> in there?";


$(function () {
        function reset() {
            $(".main").children().removeClass("selected");
            $("#result").empty();
            $("#result_message").empty();

        }

        function populateResult(output) {
            var $result = $("#result");
            if (typeof output == 'undefined') {
                $result.html("FAILURE");
            } else {
                var resultHasFake = false;
                prepareResultPlaceHolders(output.length);
                for (i = 0; i < output.length; i++) {
                    if (output[i] === " ") {
                        if (i + 1 != output.length && output[i + 1] !== " ") {
                            setTimeout(makeAddSpaceFunction(i), (2 * i) * animSpeed);
                        }
                    }
                    else {
                        var element = output[i];
                        var isFake = false;
                        if (element.charAt(0) === "_") {
                            element = element.substring(1, element.length);
                            isFake = true;
                            resultHasFake = true;
                        }

                        setTimeout(makeHoverInFunction("#" + element), (2 * i) * animSpeed);
                        setTimeout(makeHoverOutFunction("#" + element, element, i, isFake), (2 * i + 1) * animSpeed);
                    }
                }
                setTimeout(makeAddResultMessageFunction(resultHasFake), (2 * output.length) * animSpeed);
            }
        }

        function prepareResultPlaceHolders(outputLength) {
            for (var i = 0; i < outputLength; i++) {
                $("#result").append("<li style=\"display:none\" id=\"resultElement" + i + "\"></li>");
            }
        }

        function makeAddResultMessageFunction(usesFake) {
            return function () {
                $("#result_message").html(usesFake ? fakeMessage : successMessage).fadeIn("slow");
                $("#go").prop("disabled", false);

            };
        }

        function makeAddSpaceFunction(i) {
            return function () {
                $("#resultElement" + i).addClass("empty").fadeIn("slow");
            };
        }

        function makeHoverInFunction(element) {
            return function () {
                $(element).addClass("hovered").addClass("selected");
            };
        }

        function makeHoverOutFunction(element, elementName, i, isFake) {
            return function () {
                $(element).removeClass("hovered");
                var nb = isFake ? 3.14 : $(element).attr("data-nb");
                var pos = isFake ? 42 : $(element).attr("data-pos");
                var name = isFake ? elementName + "ium" : $(element).children("span").text();
                var $resultElement = $("#resultElement" + i);
                $resultElement.attr("data-nb", nb);
                $resultElement.attr("data-pos", pos);
                if (isFake) {
                    $resultElement.addClass("fakeElement");
                }
                $resultElement.text(elementName);
                $resultElement.append("<span>" + name + "</span>");

                $resultElement.show("slow");
            };
        }

        function camelCaseFakeElement(fakeElement) {
            var fakeElementWithCaps = fakeElement.toLowerCase();
            fakeElementWithCaps = fakeElementWithCaps.replace(fakeElementWithCaps.charAt(0), fakeElement.charAt(0));
            return fakeElementWithCaps;
        }

        function createWithFake(inputArray, outputArray) {
            var outputWithFake = [];
            var outputAsString = "";
            for (var i = 0; i < outputArray.length; i++) {
                outputAsString += outputArray[i].toUpperCase();
                outputAsString += "_";
            }

            var inputAsString = "";
            for (var i = 0; i < inputArray.length; i++) {
                inputAsString += inputArray[i];
            }

            var outputArrayIndex = 0;
            var inputIndex = 0;
            var outputIndex = 0;
            var fakeElement = "";
            while (inputIndex < inputAsString.length) {
                if (inputAsString[inputIndex] === outputAsString[outputIndex]) {

                    var elementFromArray = outputArray[outputArrayIndex];
                    if (inputAsString.substring(inputIndex, inputIndex + elementFromArray.length) === elementFromArray.toUpperCase()) {
                        if (fakeElement.length > 0) {
                            var camelCasedFakeElement = camelCaseFakeElement(fakeElement);
                            outputWithFake.push("_" + camelCasedFakeElement);
                            fakeElement = "";
                        }
                        outputWithFake.push(elementFromArray);
                        outputArrayIndex++;
                        inputIndex += elementFromArray.length;
                        outputIndex += elementFromArray.length + 1; //since next char would be underscore..
                        continue;
                    }
                }
                if (fakeElement.length >= 2) {
                    var fakeElementWithCaps = camelCaseFakeElement(fakeElement);
                    outputWithFake.push("_" + fakeElementWithCaps);
                    fakeElement = "";
                }

                fakeElement += inputAsString.charAt(inputIndex);
                inputIndex++;
            }
            if (fakeElement.length > 0) {
                var camelCasedFakeElement = camelCaseFakeElement(fakeElement);
                outputWithFake.push("_" + camelCasedFakeElement);
                fakeElement = "";
            }
            return outputWithFake;
        }

        $("#go").click(function () {
            reset();
            $(this).prop("disabled", true);
            var inputValue = $("#name").val().toUpperCase().split("");
            var output = findNameInPeriodicTable(inputValue);
            var outputWithFake = createWithFake(inputValue, output);
            populateResult(outputWithFake);
        });
    }
);

