cmd_Release/obj.target/secp256k1/src/secp256k1/src/secp256k1.o := cc -o Release/obj.target/secp256k1/src/secp256k1/src/secp256k1.o ../src/secp256k1/src/secp256k1.c '-DNODE_GYP_MODULE_NAME=secp256k1' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DECMULT_GEN_PREC_BITS=4' '-DECMULT_WINDOW_SIZE=15' '-DENABLE_MODULE_ECDH=1' '-DENABLE_MODULE_RECOVERY=1' '-DUSE_ENDOMORPHISM=1' '-DUSE_NUM_NONE=1' '-DUSE_FIELD_INV_BUILTIN=1' '-DUSE_SCALAR_INV_BUILTIN=1' '-DUSE_FIELD_10X26=1' '-DUSE_SCALAR_8X32=1' -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/include/node -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/src -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/deps/openssl/config -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/deps/openssl/openssl/include -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/deps/uv/include -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/deps/zlib -I/Users/jarettdunn/Library/Caches/node-gyp/16.17.1/deps/v8/include -I../src/secp256k1 -I../src/secp256k1/src  -O3 -gdwarf-2 -mmacosx-version-min=10.13 -arch arm64 -Wall -Wendif-labels -W -Wno-unused-parameter -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/secp256k1/src/secp256k1/src/secp256k1.o.d.raw   -c
Release/obj.target/secp256k1/src/secp256k1/src/secp256k1.o: \
  ../src/secp256k1/src/secp256k1.c ../src/secp256k1/include/secp256k1.h \
  ../src/secp256k1/include/secp256k1_preallocated.h \
  ../src/secp256k1/src/util.h ../src/secp256k1/src/num_impl.h \
  ../src/secp256k1/src/num.h ../src/secp256k1/src/field_impl.h \
  ../src/secp256k1/src/field_10x26_impl.h ../src/secp256k1/src/field.h \
  ../src/secp256k1/src/field_10x26.h ../src/secp256k1/src/scalar_impl.h \
  ../src/secp256k1/src/scalar.h ../src/secp256k1/src/scalar_8x32.h \
  ../src/secp256k1/src/scalar_8x32_impl.h \
  ../src/secp256k1/src/group_impl.h ../src/secp256k1/src/group.h \
  ../src/secp256k1/src/ecmult_impl.h ../src/secp256k1/src/ecmult.h \
  ../src/secp256k1/src/scratch.h \
  ../src/secp256k1/src/ecmult_const_impl.h \
  ../src/secp256k1/src/ecmult_const.h \
  ../src/secp256k1/src/ecmult_gen_impl.h \
  ../src/secp256k1/src/ecmult_gen.h ../src/secp256k1/src/hash_impl.h \
  ../src/secp256k1/src/hash.h ../src/secp256k1/src/ecdsa_impl.h \
  ../src/secp256k1/src/ecdsa.h ../src/secp256k1/src/eckey_impl.h \
  ../src/secp256k1/src/eckey.h ../src/secp256k1/src/scratch_impl.h \
  ../src/secp256k1/src/modules/ecdh/main_impl.h \
  ../src/secp256k1/include/secp256k1_ecdh.h \
  ../src/secp256k1/src/modules/recovery/main_impl.h \
  ../src/secp256k1/include/secp256k1_recovery.h
../src/secp256k1/src/secp256k1.c:
../src/secp256k1/include/secp256k1.h:
../src/secp256k1/include/secp256k1_preallocated.h:
../src/secp256k1/src/util.h:
../src/secp256k1/src/num_impl.h:
../src/secp256k1/src/num.h:
../src/secp256k1/src/field_impl.h:
../src/secp256k1/src/field_10x26_impl.h:
../src/secp256k1/src/field.h:
../src/secp256k1/src/field_10x26.h:
../src/secp256k1/src/scalar_impl.h:
../src/secp256k1/src/scalar.h:
../src/secp256k1/src/scalar_8x32.h:
../src/secp256k1/src/scalar_8x32_impl.h:
../src/secp256k1/src/group_impl.h:
../src/secp256k1/src/group.h:
../src/secp256k1/src/ecmult_impl.h:
../src/secp256k1/src/ecmult.h:
../src/secp256k1/src/scratch.h:
../src/secp256k1/src/ecmult_const_impl.h:
../src/secp256k1/src/ecmult_const.h:
../src/secp256k1/src/ecmult_gen_impl.h:
../src/secp256k1/src/ecmult_gen.h:
../src/secp256k1/src/hash_impl.h:
../src/secp256k1/src/hash.h:
../src/secp256k1/src/ecdsa_impl.h:
../src/secp256k1/src/ecdsa.h:
../src/secp256k1/src/eckey_impl.h:
../src/secp256k1/src/eckey.h:
../src/secp256k1/src/scratch_impl.h:
../src/secp256k1/src/modules/ecdh/main_impl.h:
../src/secp256k1/include/secp256k1_ecdh.h:
../src/secp256k1/src/modules/recovery/main_impl.h:
../src/secp256k1/include/secp256k1_recovery.h:
