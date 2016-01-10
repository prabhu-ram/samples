angular.module("productCategoryModule")
  .factory("requiredFieldValidationService", requiredFieldValidationService);

// all the functions here are available to all the controllers
// so put functions here that are reusable

function requiredFieldValidationService() {

	// change this name later	
	function _getRequiredValidationMessage(requiredInfos) {

		var errorMessages = [];
		if (requiredInfos.length > 0) {
			angular.forEach(requiredInfos, function (requiredInfo) {
				if (requiredInfo.name !== 'undefined' &&
				   (requiredInfo.name === null ||
				   requiredInfo.name === '' ||
				   requiredInfo.name.length === 0) )
				{
					errorMessages.push(requiredInfo.errorMessage);
				}
			});
		}
		return errorMessages;
	}

	// because the above is a private method, the following is needed
	return {
		getRequiredFieldValidationErrorMessage: _getRequiredValidationMessage
	};
}
