#pragma once

#include <memory>
#include <utility>

#include <jsi/jsi.h>

#include "JsiSkData.h"
#include "JsiSkHostObjects.h"
#include "JsiSkTypeface.h"
#include "JskSkGetFirstCodepoint.h"

namespace RNSkia {

namespace jsi = facebook::jsi;

class JsiSkTypefaceFactory : public JsiSkHostObject {
public:
  JSI_HOST_FUNCTION(MakeDefaultTypeface) {
    sk_sp<SkFontMgr> mgr(SkFontMgr::RefDefault());
    sk_sp<SkTypeface> typeface(mgr->matchFamilyStyle(nullptr, SkFontStyle()));

    if (typeface == nullptr) {
      return jsi::Value::null();
    }
    return jsi::Object::createFromHostObject(
        runtime, std::make_shared<JsiSkTypeface>(getContext(), typeface));
  }

  JSI_HOST_FUNCTION(MakeTypefaceWithChar) {
    auto utf8str = arguments[0].asString(runtime).utf8(runtime);
    auto strArg = get_first_codepoint(utf8str);

    sk_sp<SkFontMgr> mgr(SkFontMgr::RefDefault());
    sk_sp<SkTypeface> typeface(mgr->matchFamilyStyleCharacter(
        nullptr, SkFontStyle(), nullptr, 0, strArg));

    if (typeface == nullptr) {
      return jsi::Value::null();
    }
    return jsi::Object::createFromHostObject(
        runtime, std::make_shared<JsiSkTypeface>(getContext(), typeface));
  }

  JSI_HOST_FUNCTION(MakeFreeTypeFaceFromData) {
    auto data = JsiSkData::fromValue(runtime, arguments[0]);
    auto typeface = SkFontMgr::RefDefault()->makeFromData(std::move(data));
    if (typeface == nullptr) {
      return jsi::Value::null();
    }
    return jsi::Object::createFromHostObject(
        runtime, std::make_shared<JsiSkTypeface>(getContext(), typeface));
  }

  JSI_EXPORT_FUNCTIONS(
    JSI_EXPORT_FUNC(JsiSkTypefaceFactory, MakeFreeTypeFaceFromData),
    JSI_EXPORT_FUNC(JsiSkTypefaceFactory, MakeTypefaceWithChar),
    JSI_EXPORT_FUNC(JsiSkTypefaceFactory, MakeDefaultTypeface))

  explicit JsiSkTypefaceFactory(std::shared_ptr<RNSkPlatformContext> context)
      : JsiSkHostObject(std::move(context)) {}
};

} // namespace RNSkia
