
describe "line-fit", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))
    after ->
      unloadComp(env)

    it "should work"
