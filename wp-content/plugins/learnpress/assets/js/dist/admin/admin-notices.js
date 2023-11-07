/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/apps/js/admin/api.js":
/*!*****************************************!*\
  !*** ./assets/src/apps/js/admin/api.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * List API on backend
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  apiAdminNotice: lpGlobalSettings.rest + 'lp/v1/admin/tools/admin-notices',
  apiAdminOrderStatic: lpGlobalSettings.rest + 'lp/v1/orders/statistic',
  apiAddons: lpGlobalSettings.rest + 'lp/v1/addon/all',
  apiAddonAction: lpGlobalSettings.rest + 'lp/v1/addon/action'
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***************************************************!*\
  !*** ./assets/src/apps/js/admin/admin-notices.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./assets/src/apps/js/admin/api.js");
/**
 * Script handle admin notices.
 *
 * @since 4.1.7.3.2
 * @version 1.0.1
 */

let elLPAdminNotices = null;
let elBtnDismiss;
let dataHtml = null;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tab = urlParams.get('tab');
const notifyAddonsNewVersion = () => {
  try {
    const elAdminMenu = document.querySelector('#adminmenu');
    if (!elAdminMenu) {
      return;
    }
    const elTabLP = elAdminMenu.querySelector('#toplevel_page_learn_press');
    if (!elTabLP) {
      return;
    }
    const elTabLPName = elTabLP.querySelector('.wp-menu-name');
    if (!elTabLPName) {
      return;
    }
    const elAddonsNewVerTotal = document.querySelector('input[name=lp-addons-new-version-totals]');
    if (!elAddonsNewVerTotal) {
      return;
    }
    const htmlNotifyLP = `<span class="tab-lp-admin-notice"></span>`;
    elTabLPName.insertAdjacentHTML('beforeend', htmlNotifyLP);
    const elTabLPAddons = elTabLP.querySelector('a[href="admin.php?page=learn-press-addons"]');
    if (!elTabLPAddons) {
      return;
    }
    const total = elAddonsNewVerTotal.value;
    const html = `<span style="margin-left: 5px" class="update-plugins">${total}</span>`;
    elTabLPAddons.setAttribute('href', 'admin.php?page=learn-press-addons&tab=update');
    elTabLPAddons.insertAdjacentHTML('beforeend', html);
  } catch (e) {
    console.log(e);
  }
};
const callAdminNotices = (set = '') => {
  if (!lpGlobalSettings.is_admin) {
    return;
  }
  let params = tab ? `?tab=${tab}` : '';
  params += set ? (tab ? '&' : '?') + `${set}` : '';
  fetch(_api__WEBPACK_IMPORTED_MODULE_0__["default"].apiAdminNotice + params, {
    method: 'GET',
    headers: {
      'X-WP-Nonce': lpGlobalSettings.nonce
    }
  }).then(res => res.json()).then(res => {
    // console.log(data);

    const {
      status,
      message,
      data
    } = res;
    if (status === 'success') {
      if ('Dismissed!' !== message) {
        dataHtml = data.content;
        if (dataHtml.length === 0 && elLPAdminNotices) {
          elLPAdminNotices.style.display = 'none';
        }
      }
    } else {
      dataHtml = message;
    }
  }).catch(err => {
    console.log(err);
  });
};
callAdminNotices();

/*** DOMContentLoaded ***/
document.addEventListener('DOMContentLoaded', () => {
  elLPAdminNotices = document.querySelector('.lp-admin-notices');
  elBtnDismiss = document.querySelector('.btn-lp-notice-dismiss');
  const interval = setInterval(() => {
    if (dataHtml !== null) {
      if (dataHtml.length > 0) {
        elLPAdminNotices.innerHTML = dataHtml;
        elLPAdminNotices.style.display = 'block';
        // Handle notify addons new version.
        notifyAddonsNewVersion();
      }
      clearInterval(interval);
    }
  }, 1);
});

/*** Events ***/
document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('btn-lp-notice-dismiss')) {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you want to dismiss this notice?')) {
      const parent = el.closest('.lp-notice');
      callAdminNotices(`dismiss=${el.getAttribute('data-dismiss')}`);
      parent.remove();
      if (elLPAdminNotices.querySelectorAll('.lp-notice').length === 0) {
        elLPAdminNotices.style.display = 'none';
      }
    }
  }
});
}();
/******/ })()
;
//# sourceMappingURL=admin-notices.js.map