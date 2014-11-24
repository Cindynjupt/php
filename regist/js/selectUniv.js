(function($){
$.extend({
ms_DatePicker: function (options) {
            var defaults = {
                YearSelector: "#entertime",
                FirstText: "--",
                FirstValue: 0
            };
            var opts = $.extend({}, defaults, options);
            var $YearSelector = $(opts.YearSelector);
            var FirstText = opts.FirstText;
            var FirstValue = opts.FirstValue;

            // 初始化
            var str = "<option value=\"" + FirstValue + "\">" + FirstText + "</option>";
            $YearSelector.html(str);
            // 年份列表
            var yearNow = new Date().getFullYear();
			var yearSel = $YearSelector.attr("rel");
            for (var i = yearNow; i >= 2004; i--) {
				var sed = yearSel==i?"selected":"";
				var yearStr = "<option value=\"" + i + "\" " + sed+">" + i + "</option>";
                $YearSelector.append(yearStr);
            }

        } // End ms_DatePicker
});
})(jQuery);