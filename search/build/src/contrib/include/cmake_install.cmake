# Install script for directory: /Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set path to fallback-tool for dependency-resolution.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/objdump")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/lucene++" TYPE FILE FILES
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicLetterTokenizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicNormalizationFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicNormalizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ArabicStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/BrazilianAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/BrazilianStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/BrazilianStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/CJKAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/CJKTokenizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ChineseAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ChineseFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ChineseTokenizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ContribInc.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/CzechAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/DefaultEncoder.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/DutchAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/DutchStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/DutchStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ElisionFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/Encoder.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/Formatter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/Fragmenter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/FrenchAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/FrenchStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/FrenchStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GermanAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GermanStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GermanStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GradientFormatter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GreekAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/GreekLowerCaseFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/Highlighter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/HighlighterScorer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/LuceneContrib.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/MapWeightedSpanTerm.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/MemoryIndex.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/NullFragmenter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/PersianAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/PersianNormalizationFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/PersianNormalizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/QueryScorer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/QueryTermExtractor.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/QueryTermScorer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/ReverseStringFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/RussianAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/RussianLetterTokenizer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/RussianLowerCaseFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/RussianStemFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/RussianStemmer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SimpleFragmenter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SimpleHTMLEncoder.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SimpleHTMLFormatter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SimpleSpanFragmenter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SnowballAnalyzer.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SnowballFilter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/SpanGradientFormatter.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/TextFragment.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/TokenGroup.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/TokenSources.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/WeightedSpanTerm.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/WeightedSpanTermExtractor.h"
    "/Users/SHR/Desktop/alpha/search/LucenePlusPlus/src/contrib/include/WeightedTerm.h"
    )
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
if(CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "/Users/SHR/Desktop/alpha/search/build/src/contrib/include/install_local_manifest.txt"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
