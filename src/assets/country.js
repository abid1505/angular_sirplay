!function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(i) {
        n(i, window, document)
    }) : n(jQuery, window, document)
}(function(n, i, t, a) {
    "use strict";
    var e = "countrySelect"
      , s = 1
      , o = {
        defaultCountry: "",
        defaultStyling: "inside",
        excludeCountries: [],
        onlyCountries: [],
        preferredCountries: ["ind", "us"]
    }
      , r = 38
      , u = 40
      , l = 13
      , h = 27
      , c = 65
      , d = 90
      , p = 32
      , g = 9;
    function y(i, t) {
        this.element = i,
        this.options = n.extend({}, o, t),
        this._defaults = o,
        this.ns = "." + e + s++,
        this._name = e,
        this.init()
    }
    n(i).on("load", function() {
        !0
    }),
    y.prototype = {
        init: function() {
            return this._processCountryData(),
            this._generateMarkup(),
            this._setInitialState(),
            this._initListeners(),
            this.autoCountryDeferred = new n.Deferred,
            this._initAutoCountry(),
            this.autoCountryDeferred
        },
        _processCountryData: function() {
            this._setInstanceCountryData(),
            this._setPreferredCountries()
        },
        _setInstanceCountryData: function() {
            var i = this;
            if (this.options.onlyCountries.length) {
                var t = [];
                n.each(this.options.onlyCountries, function(n, a) {
                    var e = i._getCountryData(a, !0);
                    e && t.push(e)
                }),
                this.countries = t
            } else if (this.options.excludeCountries.length) {
                var a = this.options.excludeCountries.map(function(n) {
                    return n.toLowerCase()
                });
                this.countries = f.filter(function(n) {
                    return -1 === a.indexOf(n.iso2)
                })
            } else
                this.countries = f
        },
        _setPreferredCountries: function() {
            var i = this;
            this.preferredCountries = [],
            n.each(this.options.preferredCountries, function(n, t) {
                var a = i._getCountryData(t, !1);
                a && i.preferredCountries.push(a)
            })
        },
        _generateMarkup: function() {
            this.countryInput = n(this.element);
            var i = "country-select";
            this.options.defaultStyling && (i += " " + this.options.defaultStyling),
            this.countryInput.wrap(n("<div>", {
                class: i
            })),
            this.flagsContainer = n("<div>", {
                class: "flag-dropdown"
            }).insertBefore(this.countryInput);
            var t = n("<div>", {
                class: "selected-flag"
            }).appendTo(this.flagsContainer);
            this.selectedFlagInner = n("<div>", {
                class: "flag"
            }).appendTo(t),
            n("<div>", {
                class: "arrow"
            }).appendTo(t),
            this.countryList = n("<ul>", {
                class: "country-list v-hide"
            }).appendTo(this.flagsContainer),
            this.preferredCountries.length && (this._appendListItems(this.preferredCountries, "preferred"),
            n("<li>", {
                class: "divider"
            }).appendTo(this.countryList)),
            this._appendListItems(this.countries, ""),
            this.countryCodeInput = n("#" + this.countryInput.attr("id") + "_code"),
            this.countryCodeInput || (this.countryCodeInput = n('<input type="hidden" id="' + this.countryInput.attr("id") + '_code" name="' + this.countryInput.attr("name") + '_code" value="" />'),
            this.countryCodeInput.insertAfter(this.countryInput)),
            this.dropdownHeight = this.countryList.outerHeight(),
            this.countryList.removeClass("v-hide").addClass("hide"),
            this.countryListItems = this.countryList.children(".country")
        },
        _appendListItems: function(i, t) {
            var a = "";
            n.each(i, function(n, i) {
                a += '<li class="country ' + t + '" data-country-code="' + i.iso2 + '">',
                a += '<div class="flag ' + i.iso2 + '"></div>',
                a += '<span class="country-name">' + i.name + "</span>",
                a += "</li>"
            }),
            this.countryList.append(a)
        },
        _setInitialState: function() {
            var n = !1;
            this.countryInput.val() && (n = this._updateFlagFromInputVal());
            var i, t = this.countryCodeInput.val();
            (t && this.selectCountry(t),
            n) || (this.options.defaultCountry && (i = this._getCountryData(this.options.defaultCountry, !1)) || (i = this.preferredCountries.length ? this.preferredCountries[0] : this.countries[0]),
            this.defaultCountry = i.iso2)
        },
        _initListeners: function() {
            var n = this
              , i = this.countryInput.closest("label");
            i.length && i.on("click" + this.ns, function(i) {
                n.countryList.hasClass("hide") ? n.countryInput.focus() : i.preventDefault()
            }),
            this.selectedFlagInner.parent().on("click" + this.ns, function(i) {
                n.countryList.hasClass("hide") && !n.countryInput.prop("disabled") && n._showDropdown()
            }),
            this.flagsContainer.on("keydown" + n.ns, function(i) {
                !n.countryList.hasClass("hide") || i.which != r && i.which != u && i.which != p && i.which != l || (i.preventDefault(),
                i.stopPropagation(),
                n._showDropdown()),
                i.which == g && n._closeDropdown()
            })
        },
        _initAutoCountry: function() {
            "auto" === this.options.initialCountry ? this._loadAutoCountry() : (this.selectCountry(this.defaultCountry),
            this.autoCountryDeferred.resolve())
        },
        _loadAutoCountry: function() {
            n.fn[e].autoCountry ? this.handleAutoCountry() : n.fn[e].startedLoadingAutoCountry || (n.fn[e].startedLoadingAutoCountry = !0,
            "function" == typeof this.options.geoIpLookup && this.options.geoIpLookup(function(i) {
                n.fn[e].autoCountry = i.toLowerCase(),
                setTimeout(function() {
                    n(".country-select input").countrySelect("handleAutoCountry")
                })
            }))
        },
        _focus: function() {
            this.countryInput.focus();
            var n = this.countryInput[0];
            if (n.setSelectionRange) {
                var i = this.countryInput.val().length;
                n.setSelectionRange(i, i)
            }
        },
        _showDropdown: function() {
            this._setDropdownPosition();
            var n = this.countryList.children(".active");
            this._highlightListItem(n),
            this.countryList.removeClass("hide"),
            this._scrollTo(n),
            this._bindDropdownListeners(),
            this.selectedFlagInner.parent().children(".arrow").addClass("up")
        },
        _setDropdownPosition: function() {
            var t = this.countryInput.offset().top
              , a = n(i).scrollTop()
              , e = t + this.countryInput.outerHeight() + this.dropdownHeight < a + n(i).height()
              , s = t - this.dropdownHeight > a
              , o = !e && s ? "-" + (this.dropdownHeight - 1) + "px" : "";
            this.countryList.css("top", o)
        },
        _bindDropdownListeners: function() {
            var i = this;
            this.countryList.on("mouseover" + this.ns, ".country", function(t) {
                i._highlightListItem(n(this))
            }),
            this.countryList.on("click" + this.ns, ".country", function(t) {
                i._selectListItem(n(this))
            });
            var a = !0;
            n("html").on("click" + this.ns, function(n) {
                a || i._closeDropdown(),
                a = !1
            }),
            n(t).on("keydown" + this.ns, function(n) {
                n.preventDefault(),
                n.which == r || n.which == u ? i._handleUpDownKey(n.which) : n.which == l ? i._handleEnterKey() : n.which == h ? i._closeDropdown() : n.which >= c && n.which <= d && i._handleLetterKey(n.which)
            })
        },
        _handleUpDownKey: function(n) {
            var i = this.countryList.children(".highlight").first()
              , t = n == r ? i.prev() : i.next();
            t.length && (t.hasClass("divider") && (t = n == r ? t.prev() : t.next()),
            this._highlightListItem(t),
            this._scrollTo(t))
        },
        _handleEnterKey: function() {
            var n = this.countryList.children(".highlight").first();
            n.length && this._selectListItem(n)
        },
        _handleLetterKey: function(i) {
            var t = String.fromCharCode(i)
              , a = this.countryListItems.filter(function() {
                return n(this).text().charAt(0) == t && !n(this).hasClass("preferred")
            });
            if (a.length) {
                var e, s = a.filter(".highlight").first();
                e = s && s.next() && s.next().text().charAt(0) == t ? s.next() : a.first(),
                this._highlightListItem(e),
                this._scrollTo(e)
            }
        },
        _updateFlagFromInputVal: function() {
            var i = this
              , t = this.countryInput.val().replace(/(?=[() ])/g, "\\");
            if (t) {
                for (var a = [], e = new RegExp("^" + t,"i"), s = 0; s < this.countries.length; s++)
                    this.countries[s].name.match(e) && a.push(this.countries[s].iso2);
                var o = !1;
                return n.each(a, function(n, t) {
                    i.selectedFlagInner.hasClass(t) && (o = !0)
                }),
                o || (this._selectFlag(a[0]),
                this.countryCodeInput.val(a[0]).trigger("change")),
                !0
            }
            return !1
        },
        _highlightListItem: function(n) {
            this.countryListItems.removeClass("highlight"),
            n.addClass("highlight")
        },
        _getCountryData: function(n, i) {
            for (var t = i ? f : this.countries, a = 0; a < t.length; a++)
                if (t[a].iso2 == n)
                    return t[a];
            return null
        },
        _selectFlag: function(n) {
            if (!n)
                return !1;
            this.selectedFlagInner.attr("class", "flag " + n);
            var i = this._getCountryData(n);
            this.selectedFlagInner.parent().attr("title", i.name);
            var t = this.countryListItems.children(".flag." + n).first().parent();
            this.countryListItems.removeClass("active"),
            t.addClass("active")
        },
        _selectListItem: function(n) {
            var i = n.attr("data-country-code");
            this._selectFlag(i),
            this._closeDropdown(),
            this._updateName(i),
            this.countryInput.trigger("change"),
            this.countryCodeInput.trigger("change"),
            this._focus()
        },
        _closeDropdown: function() {
            this.countryList.addClass("hide"),
            this.selectedFlagInner.parent().children(".arrow").removeClass("up"),
            n(t).off("keydown" + this.ns),
            n("html").off("click" + this.ns),
            this.countryList.off(this.ns)
        },
        _scrollTo: function(n) {
            if (n && n.offset()) {
                var i = this.countryList
                  , t = i.height()
                  , a = i.offset().top
                  , e = a + t
                  , s = n.outerHeight()
                  , o = n.offset().top
                  , r = o + s
                  , u = o - a + i.scrollTop();
                if (o < a)
                    i.scrollTop(u);
                else if (r > e) {
                    var l = t - s;
                    i.scrollTop(u - l)
                }
            }
        },
        _updateName: function(n) {
            this.countryCodeInput.val(n).trigger("change"),
            this.countryInput.val(this._getCountryData(n).name)
        },
        handleAutoCountry: function() {
            "auto" === this.options.initialCountry && (this.defaultCountry = n.fn[e].autoCountry,
            this.countryInput.val() || this.selectCountry(this.defaultCountry),
            this.autoCountryDeferred.resolve())
        },
        getSelectedCountryData: function() {
            var n = this.selectedFlagInner.attr("class").split(" ")[1];
            return this._getCountryData(n)
        },
        selectCountry: function(n) {
            n = n.toLowerCase(),
            this.selectedFlagInner.hasClass(n) || (this._selectFlag(n),
            this._updateName(n))
        },
        setCountry: function(n) {
            this.countryInput.val(n),
            this._updateFlagFromInputVal()
        },
        destroy: function() {
            this.countryInput.off(this.ns),
            this.selectedFlagInner.parent().off(this.ns),
            this.countryInput.parent().before(this.countryInput).remove()
        }
    },
    n.fn[e] = function(i) {
        var t, s = arguments;
        return i === a || "object" == typeof i ? this.each(function() {
            n.data(this, "plugin_" + e) || n.data(this, "plugin_" + e, new y(this,i))
        }) : "string" == typeof i && "_" !== i[0] && "init" !== i ? (this.each(function() {
            var a = n.data(this, "plugin_" + e);
            a instanceof y && "function" == typeof a[i] && (t = a[i].apply(a, Array.prototype.slice.call(s, 1))),
            "destroy" === i && n.data(this, "plugin_" + e, null)
        }),
        t !== a ? t : this) : void 0
    }
    ,
    n.fn[e].getCountryData = function() {
        return f
    }
    ,
    n.fn[e].setCountryData = function(n) {
        f = n
    }
    ;
    var f = n.each([{
        n: "Afghanistan (‫افغانستان‬‎)",
        i: "af"
    }, {
        n: "Åland Islands (Åland)",
        i: "ax"
    }, {
        n: "Albania (Shqipëri)",
        i: "al"
    }, {
        n: "Algeria (‫الجزائر‬‎)",
        i: "dz"
    }, {
        n: "American Samoa",
        i: "as"
    }, {
        n: "Andorra",
        i: "ad"
    }, {
        n: "Angola",
        i: "ao"
    }, {
        n: "Anguilla",
        i: "ai"
    }, {
        n: "Antigua and Barbuda",
        i: "ag"
    }, {
        n: "Argentina",
        i: "ar"
    }, {
        n: "Armenia (Հայաստան)",
        i: "am"
    }, {
        n: "Aruba",
        i: "aw"
    }, {
        n: "Australia",
        i: "au"
    }, {
        n: "Austria (Österreich)",
        i: "at"
    }, {
        n: "Azerbaijan (Azərbaycan)",
        i: "az"
    }, {
        n: "Bahamas",
        i: "bs"
    }, {
        n: "Bahrain (‫البحرين‬‎)",
        i: "bh"
    }, {
        n: "Bangladesh (বাংলাদেশ)",
        i: "bd"
    }, {
        n: "Barbados",
        i: "bb"
    }, {
        n: "Belarus (Беларусь)",
        i: "by"
    }, {
        n: "Belgium (België)",
        i: "be"
    }, {
        n: "Belize",
        i: "bz"
    }, {
        n: "Benin (Bénin)",
        i: "bj"
    }, {
        n: "Bermuda",
        i: "bm"
    }, {
        n: "Bhutan (འབྲུག)",
        i: "bt"
    }, {
        n: "Bolivia",
        i: "bo"
    }, {
        n: "Bosnia and Herzegovina (Босна и Херцеговина)",
        i: "ba"
    }, {
        n: "Botswana",
        i: "bw"
    }, {
        n: "Brazil (Brasil)",
        i: "br"
    }, {
        n: "British Indian Ocean Territory",
        i: "io"
    }, {
        n: "British Virgin Islands",
        i: "vg"
    }, {
        n: "Brunei",
        i: "bn"
    }, {
        n: "Bulgaria (България)",
        i: "bg"
    }, {
        n: "Burkina Faso",
        i: "bf"
    }, {
        n: "Burundi (Uburundi)",
        i: "bi"
    }, {
        n: "Cambodia (កម្ពុជា)",
        i: "kh"
    }, {
        n: "Cameroon (Cameroun)",
        i: "cm"
    }, {
        n: "Canada",
        i: "ca"
    }, {
        n: "Cape Verde (Kabu Verdi)",
        i: "cv"
    }, {
        n: "Caribbean Netherlands",
        i: "bq"
    }, {
        n: "Cayman Islands",
        i: "ky"
    }, {
        n: "Central African Republic (République Centrafricaine)",
        i: "cf"
    }, {
        n: "Chad (Tchad)",
        i: "td"
    }, {
        n: "Chile",
        i: "cl"
    }, {
        n: "China (中国)",
        i: "cn"
    }, {
        n: "Christmas Island",
        i: "cx"
    }, {
        n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
        i: "cc"
    }, {
        n: "Colombia",
        i: "co"
    }, {
        n: "Comoros (‫جزر القمر‬‎)",
        i: "km"
    }, {
        n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        i: "cd"
    }, {
        n: "Congo (Republic) (Congo-Brazzaville)",
        i: "cg"
    }, {
        n: "Cook Islands",
        i: "ck"
    }, {
        n: "Costa Rica",
        i: "cr"
    }, {
        n: "Côte d’Ivoire",
        i: "ci"
    }, {
        n: "Croatia (Hrvatska)",
        i: "hr"
    }, {
        n: "Cuba",
        i: "cu"
    }, {
        n: "Curaçao",
        i: "cw"
    }, {
        n: "Cyprus (Κύπρος)",
        i: "cy"
    }, {
        n: "Czech Republic (Česká republika)",
        i: "cz"
    }, {
        n: "Denmark (Danmark)",
        i: "dk"
    }, {
        n: "Djibouti",
        i: "dj"
    }, {
        n: "Dominica",
        i: "dm"
    }, {
        n: "Dominican Republic (República Dominicana)",
        i: "do"
    }, {
        n: "Ecuador",
        i: "ec"
    }, {
        n: "Egypt (‫مصر‬‎)",
        i: "eg"
    }, {
        n: "El Salvador",
        i: "sv"
    }, {
        n: "Equatorial Guinea (Guinea Ecuatorial)",
        i: "gq"
    }, {
        n: "Eritrea",
        i: "er"
    }, {
        n: "Estonia (Eesti)",
        i: "ee"
    }, {
        n: "Ethiopia",
        i: "et"
    }, {
        n: "Falkland Islands (Islas Malvinas)",
        i: "fk"
    }, {
        n: "Faroe Islands (Føroyar)",
        i: "fo"
    }, {
        n: "Fiji",
        i: "fj"
    }, {
        n: "Finland (Suomi)",
        i: "fi"
    }, {
        n: "France",
        i: "fr"
    }, {
        n: "French Guiana (Guyane française)",
        i: "gf"
    }, {
        n: "French Polynesia (Polynésie française)",
        i: "pf"
    }, {
        n: "Gabon",
        i: "ga"
    }, {
        n: "Gambia",
        i: "gm"
    }, {
        n: "Georgia (საქართველო)",
        i: "ge"
    }, {
        n: "Germany (Deutschland)",
        i: "de"
    }, {
        n: "Ghana (Gaana)",
        i: "gh"
    }, {
        n: "Gibraltar",
        i: "gi"
    }, {
        n: "Greece (Ελλάδα)",
        i: "gr"
    }, {
        n: "Greenland (Kalaallit Nunaat)",
        i: "gl"
    }, {
        n: "Grenada",
        i: "gd"
    }, {
        n: "Guadeloupe",
        i: "gp"
    }, {
        n: "Guam",
        i: "gu"
    }, {
        n: "Guatemala",
        i: "gt"
    }, {
        n: "Guernsey",
        i: "gg"
    }, {
        n: "Guinea (Guinée)",
        i: "gn"
    }, {
        n: "Guinea-Bissau (Guiné Bissau)",
        i: "gw"
    }, {
        n: "Guyana",
        i: "gy"
    }, {
        n: "Haiti",
        i: "ht"
    }, {
        n: "Honduras",
        i: "hn"
    }, {
        n: "Hong Kong (香港)",
        i: "hk"
    }, {
        n: "Hungary (Magyarország)",
        i: "hu"
    }, {
        n: "Iceland (Ísland)",
        i: "is"
    }, {
        n: "India (भारत)",
        i: "in"
    }, {
        n: "Indonesia",
        i: "id"
    }, {
        n: "Iran (‫ایران‬‎)",
        i: "ir"
    }, {
        n: "Iraq (‫العراق‬‎)",
        i: "iq"
    }, {
        n: "Ireland",
        i: "ie"
    }, {
        n: "Isle of Man",
        i: "im"
    }, {
        n: "Israel (‫ישראל‬‎)",
        i: "il"
    }, {
        n: "Italy (Italia)",
        i: "it"
    }, {
        n: "Jamaica",
        i: "jm"
    }, {
        n: "Japan (日本)",
        i: "jp"
    }, {
        n: "Jersey",
        i: "je"
    }, {
        n: "Jordan (‫الأردن‬‎)",
        i: "jo"
    }, {
        n: "Kazakhstan (Казахстан)",
        i: "kz"
    }, {
        n: "Kenya",
        i: "ke"
    }, {
        n: "Kiribati",
        i: "ki"
    }, {
        n: "Kosovo (Kosovë)",
        i: "xk"
    }, {
        n: "Kuwait (‫الكويت‬‎)",
        i: "kw"
    }, {
        n: "Kyrgyzstan (Кыргызстан)",
        i: "kg"
    }, {
        n: "Laos (ລາວ)",
        i: "la"
    }, {
        n: "Latvia (Latvija)",
        i: "lv"
    }, {
        n: "Lebanon (‫لبنان‬‎)",
        i: "lb"
    }, {
        n: "Lesotho",
        i: "ls"
    }, {
        n: "Liberia",
        i: "lr"
    }, {
        n: "Libya (‫ليبيا‬‎)",
        i: "ly"
    }, {
        n: "Liechtenstein",
        i: "li"
    }, {
        n: "Lithuania (Lietuva)",
        i: "lt"
    }, {
        n: "Luxembourg",
        i: "lu"
    }, {
        n: "Macau (澳門)",
        i: "mo"
    }, {
        n: "Macedonia (FYROM) (Македонија)",
        i: "mk"
    }, {
        n: "Madagascar (Madagasikara)",
        i: "mg"
    }, {
        n: "Malawi",
        i: "mw"
    }, {
        n: "Malaysia",
        i: "my"
    }, {
        n: "Maldives",
        i: "mv"
    }, {
        n: "Mali",
        i: "ml"
    }, {
        n: "Malta",
        i: "mt"
    }, {
        n: "Marshall Islands",
        i: "mh"
    }, {
        n: "Martinique",
        i: "mq"
    }, {
        n: "Mauritania (‫موريتانيا‬‎)",
        i: "mr"
    }, {
        n: "Mauritius (Moris)",
        i: "mu"
    }, {
        n: "Mayotte",
        i: "yt"
    }, {
        n: "Mexico (México)",
        i: "mx"
    }, {
        n: "Micronesia",
        i: "fm"
    }, {
        n: "Moldova (Republica Moldova)",
        i: "md"
    }, {
        n: "Monaco",
        i: "mc"
    }, {
        n: "Mongolia (Монгол)",
        i: "mn"
    }, {
        n: "Montenegro (Crna Gora)",
        i: "me"
    }, {
        n: "Montserrat",
        i: "ms"
    }, {
        n: "Morocco (‫المغرب‬‎)",
        i: "ma"
    }, {
        n: "Mozambique (Moçambique)",
        i: "mz"
    }, {
        n: "Myanmar (Burma) (မြန်မာ)",
        i: "mm"
    }, {
        n: "Namibia (Namibië)",
        i: "na"
    }, {
        n: "Nauru",
        i: "nr"
    }, {
        n: "Nepal (नेपाल)",
        i: "np"
    }, {
        n: "Netherlands (Nederland)",
        i: "nl"
    }, {
        n: "New Caledonia (Nouvelle-Calédonie)",
        i: "nc"
    }, {
        n: "New Zealand",
        i: "nz"
    }, {
        n: "Nicaragua",
        i: "ni"
    }, {
        n: "Niger (Nijar)",
        i: "ne"
    }, {
        n: "Nigeria",
        i: "ng"
    }, {
        n: "Niue",
        i: "nu"
    }, {
        n: "Norfolk Island",
        i: "nf"
    }, {
        n: "North Korea (조선 민주주의 인민 공화국)",
        i: "kp"
    }, {
        n: "Northern Mariana Islands",
        i: "mp"
    }, {
        n: "Norway (Norge)",
        i: "no"
    }, {
        n: "Oman (‫عُمان‬‎)",
        i: "om"
    }, {
        n: "Pakistan (‫پاکستان‬‎)",
        i: "pk"
    }, {
        n: "Palau",
        i: "pw"
    }, {
        n: "Palestine (‫فلسطين‬‎)",
        i: "ps"
    }, {
        n: "Panama (Panamá)",
        i: "pa"
    }, {
        n: "Papua New Guinea",
        i: "pg"
    }, {
        n: "Paraguay",
        i: "py"
    }, {
        n: "Peru (Perú)",
        i: "pe"
    }, {
        n: "Philippines",
        i: "ph"
    }, {
        n: "Pitcairn Islands",
        i: "pn"
    }, {
        n: "Poland (Polska)",
        i: "pl"
    }, {
        n: "Portugal",
        i: "pt"
    }, {
        n: "Puerto Rico",
        i: "pr"
    }, {
        n: "Qatar (‫قطر‬‎)",
        i: "qa"
    }, {
        n: "Réunion (La Réunion)",
        i: "re"
    }, {
        n: "Romania (România)",
        i: "ro"
    }, {
        n: "Russia (Россия)",
        i: "ru"
    }, {
        n: "Rwanda",
        i: "rw"
    }, {
        n: "Saint Barthélemy (Saint-Barthélemy)",
        i: "bl"
    }, {
        n: "Saint Helena",
        i: "sh"
    }, {
        n: "Saint Kitts and Nevis",
        i: "kn"
    }, {
        n: "Saint Lucia",
        i: "lc"
    }, {
        n: "Saint Martin (Saint-Martin (partie française))",
        i: "mf"
    }, {
        n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        i: "pm"
    }, {
        n: "Saint Vincent and the Grenadines",
        i: "vc"
    }, {
        n: "Samoa",
        i: "ws"
    }, {
        n: "San Marino",
        i: "sm"
    }, {
        n: "São Tomé and Príncipe (São Tomé e Príncipe)",
        i: "st"
    }, {
        n: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        i: "sa"
    }, {
        n: "Senegal (Sénégal)",
        i: "sn"
    }, {
        n: "Serbia (Србија)",
        i: "rs"
    }, {
        n: "Seychelles",
        i: "sc"
    }, {
        n: "Sierra Leone",
        i: "sl"
    }, {
        n: "Singapore",
        i: "sg"
    }, {
        n: "Sint Maarten",
        i: "sx"
    }, {
        n: "Slovakia (Slovensko)",
        i: "sk"
    }, {
        n: "Slovenia (Slovenija)",
        i: "si"
    }, {
        n: "Solomon Islands",
        i: "sb"
    }, {
        n: "Somalia (Soomaaliya)",
        i: "so"
    }, {
        n: "South Africa",
        i: "za"
    }, {
        n: "South Georgia & South Sandwich Islands",
        i: "gs"
    }, {
        n: "South Korea (대한민국)",
        i: "kr"
    }, {
        n: "South Sudan (‫جنوب السودان‬‎)",
        i: "ss"
    }, {
        n: "Spain (España)",
        i: "es"
    }, {
        n: "Sri Lanka (ශ්‍රී ලංකාව)",
        i: "lk"
    }, {
        n: "Sudan (‫السودان‬‎)",
        i: "sd"
    }, {
        n: "Suriname",
        i: "sr"
    }, {
        n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
        i: "sj"
    }, {
        n: "Swaziland",
        i: "sz"
    }, {
        n: "Sweden (Sverige)",
        i: "se"
    }, {
        n: "Switzerland (Schweiz)",
        i: "ch"
    }, {
        n: "Syria (‫سوريا‬‎)",
        i: "sy"
    }, {
        n: "Taiwan (台灣)",
        i: "tw"
    }, {
        n: "Tajikistan",
        i: "tj"
    }, {
        n: "Tanzania",
        i: "tz"
    }, {
        n: "Thailand (ไทย)",
        i: "th"
    }, {
        n: "Timor-Leste",
        i: "tl"
    }, {
        n: "Togo",
        i: "tg"
    }, {
        n: "Tokelau",
        i: "tk"
    }, {
        n: "Tonga",
        i: "to"
    }, {
        n: "Trinidad and Tobago",
        i: "tt"
    }, {
        n: "Tunisia (‫تونس‬‎)",
        i: "tn"
    }, {
        n: "Turkey (Türkiye)",
        i: "tr"
    }, {
        n: "Turkmenistan",
        i: "tm"
    }, {
        n: "Turks and Caicos Islands",
        i: "tc"
    }, {
        n: "Tuvalu",
        i: "tv"
    }, {
        n: "Uganda",
        i: "ug"
    }, {
        n: "Ukraine (Україна)",
        i: "ua"
    }, {
        n: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        i: "ae"
    }, {
        n: "United Kingdom",
        i: "gb"
    }, {
        n: "United States",
        i: "us"
    }, {
        n: "U.S. Minor Outlying Islands",
        i: "um"
    }, {
        n: "U.S. Virgin Islands",
        i: "vi"
    }, {
        n: "Uruguay",
        i: "uy"
    }, {
        n: "Uzbekistan (Oʻzbekiston)",
        i: "uz"
    }, {
        n: "Vanuatu",
        i: "vu"
    }, {
        n: "Vatican City (Città del Vaticano)",
        i: "va"
    }, {
        n: "Venezuela",
        i: "ve"
    }, {
        n: "Vietnam (Việt Nam)",
        i: "vn"
    }, {
        n: "Wallis and Futuna",
        i: "wf"
    }, {
        n: "Western Sahara (‫الصحراء الغربية‬‎)",
        i: "eh"
    }, {
        n: "Yemen (‫اليمن‬‎)",
        i: "ye"
    }, {
        n: "Zambia",
        i: "zm"
    }, {
        n: "Zimbabwe",
        i: "zw"
    }], function(n, i) {
        i.name = i.n,
        i.iso2 = i.i,
        delete i.n,
        delete i.i
    })
});
