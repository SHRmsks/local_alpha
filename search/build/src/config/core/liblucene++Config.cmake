# Config module for Lucene++
#
# Provides the following variables
# liblucene++_INCLUDE_DIRS - Directories to include
# liblucene++_LIBRARIES    - Libraries to link
# liblucene++_LIBRARY_DIRS - Library directories to search for link libraries



####### Expanded from @PACKAGE_INIT@ by configure_package_config_file() #######
####### Any changes to this file will be overwritten by the next CMake run ####
####### The input file was liblucene++Config.cmake.in                            ########

get_filename_component(PACKAGE_PREFIX_DIR "${CMAKE_CURRENT_LIST_DIR}/../../usr/local" ABSOLUTE)

macro(set_and_check _var _file)
  set(${_var} "${_file}")
  if(NOT EXISTS "${_file}")
    message(FATAL_ERROR "File or directory ${_file} referenced by variable ${_var} does not exist !")
  endif()
endmacro()

macro(check_required_components _NAME)
  foreach(comp ${${_NAME}_FIND_COMPONENTS})
    if(NOT ${_NAME}_${comp}_FOUND)
      if(${_NAME}_FIND_REQUIRED_${comp})
        set(${_NAME}_FOUND FALSE)
      endif()
    endif()
  endforeach()
endmacro()

####################################################################################


# This should only be used for meson
if (NOT DEFINED set_and_check)
    macro(set_and_check _var _file)
        set(${_var} "${_file}")
        if(NOT EXISTS "${_file}")
            message(FATAL_ERROR "File or directory ${_file} referenced by variable ${_var} does not exist !")
        endif()
    endmacro()
endif()


set_and_check(liblucene++_INCLUDE_DIRS "${PACKAGE_PREFIX_DIR}/include/lucene++/")
set_and_check(liblucene++_LIBRARY_DIRS "${PACKAGE_PREFIX_DIR}/")
set(liblucene++_LIBRARIES "lucene++")


