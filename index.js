/**
 * @author Michael Pfister <michael@mp-development.de>
 * @copyright (c) 2014, Michael Pfister
 * @license BSD
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 *
 * @returns {number}
 */
function now() { return new Date().getTime(); }

/**
 *
 * @param integer t
 */
var pcache = function(t) {
    if(!isNaN(t)) {
        this.t = t * 1000;
    } else {
        this.t = null;
    }
    this.storage = {};
};

/**
 *
 * @param mixed k
 * @param mixed v
 * @param integer t
 */
pcache.prototype.set = function(k, v, t) {
    var e = null;
    if(!isNaN(t)) {
        e = t * 1000 + now();
    } else if (!isNaN(this.t)) {
        e = this.t + now();
    }
    this.storage[k]= { value: v, expire: e };
};

/**
 *
 * @param mixed k
 * @returns {*}
 */
pcache.prototype.get = function(k) {
    if (!(k in this.storage)) {
        return null;
    }
    var v = this.storage[k].value;
    if (null === this.storage[k].expire || this.storage[k].expire >= now()) {
        return v;
    }
    this.del(k);

    return null;
};

/**
 *
 * @param mixed k
 */
pcache.prototype.del = function(k) {
    delete this.storage[k];
};

/**
 *
 */
pcache.prototype.clearAll = function() {
    this.storage = {};
};

/**
 *
 * @returns {Array}
 */
pcache.prototype.keys = function() {
    var s = this.storage;
    Object.keys(this.storage).forEach(function(i) {
        if (s[i].expire <= now()) {
            delete s[i];
        }
    });
    this.storage = s;

    return Object.keys(this.storage);
};

if (typeof exports !== "undefined") {
    module.exports = pcache;
}